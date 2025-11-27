// Discord OAuth and API helpers
const DISCORD_API_BASE = "https://discord.com/api/v10";
const DISCORD_CDN_BASE = "https://cdn.discordapp.com";

export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  email?: string;
}

export interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
}

export interface DiscordMember {
  user?: DiscordUser;
  roles: string[];
  permissions?: string;
}

// Check if user has administrator permission in a guild
export function hasAdminPermission(permissions: string): boolean {
  const permissionBits = BigInt(permissions);
  const ADMINISTRATOR = BigInt(0x8);
  return (permissionBits & ADMINISTRATOR) !== BigInt(0);
}

// Fetch Discord user info
export async function getDiscordUser(accessToken: string): Promise<DiscordUser> {
  const response = await fetch(`${DISCORD_API_BASE}/users/@me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Discord user: ${response.statusText}`);
  }

  return await response.json();
}

// Fetch user's guilds
export async function getDiscordGuilds(accessToken: string): Promise<DiscordGuild[]> {
  const response = await fetch(`${DISCORD_API_BASE}/users/@me/guilds`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Discord guilds: ${response.statusText}`);
  }

  return await response.json();
}

// Get user's admin guilds only
export async function getAdminGuilds(accessToken: string): Promise<DiscordGuild[]> {
  const guilds = await getDiscordGuilds(accessToken);
  return guilds.filter(guild => hasAdminPermission(guild.permissions));
}

// Get guild icon URL
export function getGuildIconUrl(guildId: string, iconHash: string | null): string | null {
  if (!iconHash) return null;
  return `${DISCORD_CDN_BASE}/icons/${guildId}/${iconHash}.png`;
}

// Get user avatar URL
export function getUserAvatarUrl(userId: string, avatarHash: string | null): string | null {
  if (!avatarHash) {
    // Default avatar based on discriminator
    return `${DISCORD_CDN_BASE}/embed/avatars/0.png`;
  }
  return `${DISCORD_CDN_BASE}/avatars/${userId}/${avatarHash}.png`;
}
