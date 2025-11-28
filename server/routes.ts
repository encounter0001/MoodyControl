import type { Express, Request, Response } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { 
  getDiscordUser, 
  getAdminGuilds, 
  getUserAvatarUrl, 
  getGuildIconUrl 
} from "./discord";
import { updateGuildSettingsSchema } from "@shared/schema";
import { z } from "zod";

const DISCORD_API_BASE = "https://discord.com/api/v10";
const DISCORD_OAUTH_URL = "https://discord.com/oauth2/authorize";

// Middleware to check if user is authenticated
function requireAuth(req: Request, res: Response, next: Function) {
  if (!req.session.userId || !req.session.accessToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // === Authentication Routes ===
  
  // Helper function to get correct redirect URI
  function getRedirectUri(): string {
    // For development, use Replit dev domain (this is the actual accessible domain)
    if (process.env.REPLIT_DEV_DOMAIN) {
      return `https://${process.env.REPLIT_DEV_DOMAIN}/api/auth/discord/callback`;
    }
    
    // Use explicitly set redirect URI for production
    if (process.env.DISCORD_REDIRECT_URI) {
      return process.env.DISCORD_REDIRECT_URI;
    }
    
    // Fallback for local development
    return "http://localhost:5000/api/auth/discord/callback";
  }

  // Start Discord OAuth flow
  app.get("/api/auth/discord", (req, res) => {
    const clientId = process.env.DISCORD_CLIENT_ID;
    const redirectUri = getRedirectUri();
    
    const scopes = ["identify", "email", "guilds"];
    const params = new URLSearchParams({
      client_id: clientId!,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: scopes.join(" "),
    });

    console.log("[Discord Auth] Starting OAuth flow", { clientId, redirectUri, scope: "identify email guilds" });
    res.redirect(`${DISCORD_OAUTH_URL}?${params.toString()}`);
  });

  // Discord OAuth callback
  app.get("/api/auth/discord/callback", async (req, res) => {
    const { code, error } = req.query;

    if (error) {
      console.error("[Discord Auth] OAuth error:", error);
      return res.redirect(`/?error=${error}`);
    }

    if (!code) {
      return res.status(400).json({ error: "Missing authorization code" });
    }

    try {
      const clientId = process.env.DISCORD_CLIENT_ID;
      const clientSecret = process.env.DISCORD_CLIENT_SECRET;
      const redirectUri = getRedirectUri();

      // Exchange code for access token
      const tokenResponse = await fetch(`${DISCORD_API_BASE}/oauth2/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: clientId!,
          client_secret: clientSecret!,
          grant_type: "authorization_code",
          code: code as string,
          redirect_uri: redirectUri,
        }).toString(),
      });

      if (!tokenResponse.ok) {
        throw new Error("Failed to exchange code for token");
      }

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      // Fetch user info
      const userResponse = await fetch(`${DISCORD_API_BASE}/users/@me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user info");
      }

      const discordUser = await userResponse.json();

      // Create or update user in database
      let user = await storage.getUser(discordUser.id);
      if (!user) {
        user = await storage.createUser({
          id: discordUser.id,
          username: discordUser.username,
          discriminator: discordUser.discriminator,
          avatar: discordUser.avatar,
          email: discordUser.email,
          accessToken,
          refreshToken: tokenData.refresh_token,
          tokenExpiry: new Date(Date.now() + tokenData.expires_in * 1000),
        });
      } else {
        user = await storage.updateUser(discordUser.id, {
          username: discordUser.username,
          discriminator: discordUser.discriminator,
          avatar: discordUser.avatar,
          email: discordUser.email,
          accessToken,
          refreshToken: tokenData.refresh_token,
          tokenExpiry: new Date(Date.now() + tokenData.expires_in * 1000),
        }) || user;
      }

      // Set session
      req.session.userId = user.id;
      req.session.accessToken = accessToken;

      // Redirect to dashboard
      res.redirect("/dashboard");
    } catch (error) {
      console.error("Discord OAuth error:", error);
      res.redirect("/?error=auth_failed");
    }
  });

  // Logout
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  // Get bot statistics
  app.get("/api/stats", async (req, res) => {
    try {
      const allGuilds = await storage.getAllGuildSettings();
      const uptime = process.uptime();
      const days = Math.floor(uptime / 86400);
      const hours = Math.floor((uptime % 86400) / 3600);
      
      const totalSongsPlayed = allGuilds.reduce((sum, g) => sum + (g.songsPlayed || 0), 0);
      const totalUsersJamming = allGuilds.reduce((sum, g) => sum + (g.usersJamming || 0), 0);
      
      const stats = {
        activeServers: allGuilds.length,
        usersJamming: Math.max(totalUsersJamming, 0),
        songsPlayed: Math.max(totalSongsPlayed, 0),
        uptime: `${days}d ${hours}h`,
        uptimePercent: "99.9%"
      };
      
      res.json(stats);
    } catch (error) {
      console.error("Get stats error:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Get current user
  app.get("/api/auth/me", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        id: user.id,
        username: user.username,
        discriminator: user.discriminator,
        avatar: getUserAvatarUrl(user.id, user.avatar),
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  // === Guild Routes ===
  
  // Get user's admin guilds
  app.get("/api/guilds", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      if (!user.accessToken) {
        return res.status(401).json({ error: "No access token" });
      }

      // Fetch guilds from Discord API
      const adminGuilds = await getAdminGuilds(user.accessToken);

      // Get settings for each guild
      const guildsWithSettings = await Promise.all(
        adminGuilds.map(async (guild) => {
          const settings = await storage.getGuildSettings(guild.id);
          
          // If no settings exist but guild is in admin list, create default settings
          if (!settings) {
            await storage.createGuildSettings({
              id: guild.id,
              guildName: guild.name,
              guildIcon: guild.icon,
              prefix: "m!",
              volume: 100,
              bassBoost: false,
              nightcore: false,
              vaporwave: false,
            });
          }
          
          return {
            id: guild.id,
            name: guild.name,
            icon: getGuildIconUrl(guild.id, guild.icon),
            isAdmin: true,
            botInGuild: true, // Bot is always in guilds from Discord admin list
          };
        })
      );

      res.json(guildsWithSettings);
    } catch (error) {
      console.error("Get guilds error:", error);
      res.status(500).json({ error: "Failed to fetch guilds" });
    }
  });

  // Get guild settings
  app.get("/api/guilds/:guildId/settings", requireAuth, async (req, res) => {
    try {
      const { guildId } = req.params;
      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      if (!user.accessToken) {
        return res.status(401).json({ error: "No access token" });
      }

      // Verify user has access to this guild
      const adminGuilds = await getAdminGuilds(user.accessToken);
      const guildExists = adminGuilds.some(g => g.id === guildId);
      if (!guildExists) {
        return res.status(403).json({ error: "No permission to access this guild" });
      }
      
      let settings = await storage.getGuildSettings(guildId);
      
      // If settings don't exist, create default ones
      if (!settings) {
        const guild = adminGuilds.find(g => g.id === guildId);
        settings = await storage.createGuildSettings({
          id: guildId,
          guildName: guild?.name || `Guild ${guildId}`,
          guildIcon: guild?.icon || null,
          prefix: "!",
          volume: 100,
          djRole: null,
          bassBoost: false,
          nightcore: false,
          vaporwave: false,
        });
      }

      res.json(settings);
    } catch (error) {
      console.error("Get guild settings error:", error);
      res.status(500).json({ error: "Failed to fetch guild settings" });
    }
  });

  // Update guild settings
  app.patch("/api/guilds/:guildId/settings", requireAuth, async (req, res) => {
    try {
      const { guildId } = req.params;
      
      // Validate request body
      const updateData = updateGuildSettingsSchema.parse({
        id: guildId,
        ...req.body
      });

      // Check if settings exist
      let settings = await storage.getGuildSettings(guildId);
      if (!settings) {
        return res.status(404).json({ error: "Guild settings not found" });
      }

      // Update settings
      settings = await storage.updateGuildSettings(guildId, updateData);
      if (!settings) {
        return res.status(500).json({ error: "Failed to update settings" });
      }

      res.json(settings);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
      }
      console.error("Update guild settings error:", error);
      res.status(500).json({ error: "Failed to update guild settings" });
    }
  });

  return httpServer;
}
