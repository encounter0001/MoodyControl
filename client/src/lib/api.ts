// API client for frontend
export interface ApiError {
  error: string;
  details?: any;
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.error || `API error: ${response.status}`);
  }
  return response.json();
}

// Auth API
export const authApi = {
  login: async () => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    return handleResponse(response);
  },

  logout: async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    return handleResponse(response);
  },

  me: async () => {
    const response = await fetch("/api/auth/me", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return handleResponse(response);
  },
};

// Guilds API
export const guildsApi = {
  getAll: async () => {
    const response = await fetch("/api/guilds", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return handleResponse(response);
  },

  getSettings: async (guildId: string) => {
    const response = await fetch(`/api/guilds/${guildId}/settings`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return handleResponse(response);
  },

  updateSettings: async (guildId: string, settings: any) => {
    const response = await fetch(`/api/guilds/${guildId}/settings`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    return handleResponse(response);
  },
};
