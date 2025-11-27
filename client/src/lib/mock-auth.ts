import { create } from 'zustand';

export interface User {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
}

export interface Guild {
  id: string;
  name: string;
  icon: string | null;
  isAdmin: boolean;
  botInGuild: boolean;
}

export interface GuildSettings {
  guildId: string;
  prefix: string;
  volume: number;
  djRole: string | null;
  musicStatus: 'playing' | 'idle' | 'paused';
  currentTrack?: {
    title: string;
    artist: string;
    duration: number;
    position: number;
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

interface GuildState {
  guilds: Guild[];
  settings: Record<string, GuildSettings>;
  updatePrefix: (guildId: string, prefix: string) => void;
}

// Mock Data
const MOCK_USER: User = {
  id: "1112239801400303676",
  username: "WYNO LIVE",
  avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
  discriminator: "0001"
};

const MOCK_GUILDS: Guild[] = [
  { id: "1", name: "Moody Vibes", icon: null, isAdmin: true, botInGuild: true },
  { id: "2", name: "Gaming Lounge", icon: null, isAdmin: true, botInGuild: true },
  { id: "3", name: "Friends Only", icon: null, isAdmin: false, botInGuild: true }, // Should be hidden
  { id: "4", name: "Test Server", icon: null, isAdmin: true, botInGuild: false },
];

const MOCK_SETTINGS: Record<string, GuildSettings> = {
  "1": { guildId: "1", prefix: "!", volume: 80, djRole: null, musicStatus: 'playing', currentTrack: { title: "Midnight City", artist: "M83", duration: 240, position: 120 } },
  "2": { guildId: "2", prefix: "?", volume: 100, djRole: "DJ", musicStatus: 'idle' },
  "4": { guildId: "4", prefix: "m!", volume: 50, djRole: null, musicStatus: 'idle' },
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: () => set({ user: MOCK_USER, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

export const useGuilds = create<GuildState>((set) => ({
  guilds: MOCK_GUILDS,
  settings: MOCK_SETTINGS,
  updatePrefix: (guildId, prefix) => set((state) => ({
    settings: {
      ...state.settings,
      [guildId]: { ...state.settings[guildId], prefix }
    }
  })),
}));
