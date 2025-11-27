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
  
  // Login with Discord - Redirect to Discord OAuth
  app.get("/api/auth/discord", (req, res) => {
    // Use Replit's Discord connector - users authenticate via Replit UI
    // For now, we'll use a mock login for development
    res.json({ 
      message: "Please use the Discord integration setup in Replit" 
    });
  });

  // Mock login endpoint for development (simulates Discord OAuth)
  app.post("/api/auth/login", async (req, res) => {
    try {
      // In production, this would handle the OAuth callback
      // For now, create a mock user session
      const mockUser = {
        id: "1112239801400303676",
        username: "WYNO LIVE",
        discriminator: "0001",
        avatar: null,
        email: "user@example.com",
        accessToken: "mock_token",
        refreshToken: "mock_refresh",
        tokenExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      };

      // Create or update user in database
      let user = await storage.getUser(mockUser.id);
      if (!user) {
        user = await storage.createUser(mockUser);
      } else {
        user = await storage.updateUser(mockUser.id, mockUser) || user;
      }

      // Set session
      req.session.userId = user.id;
      req.session.accessToken = mockUser.accessToken;

      res.json({ 
        user: {
          id: user.id,
          username: user.username,
          discriminator: user.discriminator,
          avatar: getUserAvatarUrl(user.id, user.avatar),
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Failed to login" });
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
      // In production, fetch from Discord API using access token
      // For now, return mock data based on what guilds have bot
      const mockGuilds = [
        { 
          id: "1", 
          name: "Moody Vibes", 
          icon: null, 
          owner: false, 
          permissions: "8" // Administrator
        },
        { 
          id: "2", 
          name: "Gaming Lounge", 
          icon: null, 
          owner: false, 
          permissions: "8" 
        },
        { 
          id: "4", 
          name: "Test Server", 
          icon: null, 
          owner: true, 
          permissions: "8" 
        },
      ];

      // Get settings for each guild
      const guildsWithSettings = await Promise.all(
        mockGuilds.map(async (guild) => {
          const settings = await storage.getGuildSettings(guild.id);
          return {
            id: guild.id,
            name: guild.name,
            icon: getGuildIconUrl(guild.id, guild.icon),
            isAdmin: true,
            botInGuild: settings !== undefined,
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
      
      let settings = await storage.getGuildSettings(guildId);
      
      // If settings don't exist, create default ones
      if (!settings) {
        const mockGuild = { id: guildId, name: `Guild ${guildId}`, icon: null };
        settings = await storage.createGuildSettings({
          id: guildId,
          guildName: mockGuild.name,
          guildIcon: mockGuild.icon,
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
