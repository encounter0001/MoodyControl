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

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  thumbnail?: string;
  requester: string;
}

export interface GuildSettings {
  guildId: string;
  prefix: string;
  volume: number;
  djRole: string | null;
  musicStatus: 'playing' | 'paused' | 'idle';
  currentTrack?: Track;
  queue: Track[];
  filters: {
    bassBoost: boolean;
    nightcore: boolean;
    vaporwave: boolean;
  };
  logs: string[]; // Mock logs for the console
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
  // Actions
  updatePrefix: (guildId: string, prefix: string) => void;
  setVolume: (guildId: string, volume: number) => void;
  togglePlayPause: (guildId: string) => void;
  skipTrack: (guildId: string) => void;
  toggleFilter: (guildId: string, filter: keyof GuildSettings['filters']) => void;
  removeFromQueue: (guildId: string, trackId: string) => void;
  setDjRole: (guildId: string, roleId: string | null) => void;
  addLog: (guildId: string, message: string) => void;
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
  { id: "3", name: "Friends Only", icon: null, isAdmin: false, botInGuild: true },
  { id: "4", name: "Test Server", icon: null, isAdmin: true, botInGuild: false },
];

const MOCK_TRACKS: Track[] = [
  { id: "t1", title: "Midnight City", artist: "M83", duration: 240, requester: "WYNO LIVE" },
  { id: "t2", title: "Starboy", artist: "The Weeknd", duration: 230, requester: "User123" },
  { id: "t3", title: "Blinding Lights", artist: "The Weeknd", duration: 200, requester: "GamerTag" },
  { id: "t4", title: "Neon Blade", artist: "MoonDeity", duration: 255, requester: "CyberPunk" },
];

const INITIAL_SETTINGS: Record<string, GuildSettings> = {
  "1": { 
    guildId: "1", 
    prefix: "!", 
    volume: 80, 
    djRole: null, 
    musicStatus: 'playing', 
    currentTrack: MOCK_TRACKS[0],
    queue: [MOCK_TRACKS[1], MOCK_TRACKS[2], MOCK_TRACKS[3]],
    filters: { bassBoost: false, nightcore: false, vaporwave: false },
    logs: ["[INFO] Connected to Voice Channel", "[INFO] Loaded playlist 'Chill Vibes'", "[PLAY] Now playing: Midnight City"]
  },
  "2": { 
    guildId: "2", 
    prefix: "?", 
    volume: 100, 
    djRole: "DJ", 
    musicStatus: 'idle', 
    queue: [],
    filters: { bassBoost: true, nightcore: false, vaporwave: false },
    logs: ["[INFO] Bot started"]
  },
  "4": { 
    guildId: "4", 
    prefix: "m!", 
    volume: 50, 
    djRole: null, 
    musicStatus: 'idle', 
    queue: [],
    filters: { bassBoost: false, nightcore: false, vaporwave: false },
    logs: []
  },
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: () => set({ user: MOCK_USER, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

export const useGuilds = create<GuildState>((set) => ({
  guilds: MOCK_GUILDS,
  settings: INITIAL_SETTINGS,
  
  updatePrefix: (guildId, prefix) => set((state) => ({
    settings: {
      ...state.settings,
      [guildId]: { ...state.settings[guildId], prefix }
    }
  })),

  setVolume: (guildId, volume) => set((state) => ({
    settings: {
      ...state.settings,
      [guildId]: { ...state.settings[guildId], volume }
    }
  })),

  togglePlayPause: (guildId) => set((state) => {
    const currentStatus = state.settings[guildId].musicStatus;
    const newStatus = currentStatus === 'playing' ? 'paused' : 'playing';
    return {
      settings: {
        ...state.settings,
        [guildId]: { ...state.settings[guildId], musicStatus: newStatus }
      }
    };
  }),

  skipTrack: (guildId) => set((state) => {
    const guildSettings = state.settings[guildId];
    const newQueue = [...guildSettings.queue];
    const nextTrack = newQueue.shift();
    
    return {
      settings: {
        ...state.settings,
        [guildId]: {
          ...guildSettings,
          currentTrack: nextTrack || undefined,
          queue: newQueue,
          musicStatus: nextTrack ? 'playing' : 'idle'
        }
      }
    };
  }),

  toggleFilter: (guildId, filter) => set((state) => ({
    settings: {
      ...state.settings,
      [guildId]: {
        ...state.settings[guildId],
        filters: {
          ...state.settings[guildId].filters,
          [filter]: !state.settings[guildId].filters[filter]
        }
      }
    }
  })),

  removeFromQueue: (guildId, trackId) => set((state) => ({
    settings: {
      ...state.settings,
      [guildId]: {
        ...state.settings[guildId],
        queue: state.settings[guildId].queue.filter(t => t.id !== trackId)
      }
    }
  })),

  setDjRole: (guildId, roleId) => set((state) => ({
    settings: {
      ...state.settings,
      [guildId]: { ...state.settings[guildId], djRole: roleId }
    }
  })),

  addLog: (guildId, message) => set((state) => ({
    settings: {
      ...state.settings,
      [guildId]: {
        ...state.settings[guildId],
        logs: [...state.settings[guildId].logs, `[${new Date().toLocaleTimeString()}] ${message}`].slice(-50) // Keep last 50
      }
    }
  })),
}));
