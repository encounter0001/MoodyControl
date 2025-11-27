# Moody Music Bot - Discord Music Bot Dashboard

## Overview

Moody Music Bot is a full-stack web application that provides a dashboard interface for managing a Discord music bot. The application allows Discord server administrators to configure bot settings, manage music playback, and control audio filters through a modern web interface. The system consists of a React-based frontend with a cyberpunk/futuristic design theme and an Express backend that integrates with Discord's OAuth system and manages guild-specific settings.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**: React 18 with TypeScript, Vite for bundling, and Wouter for client-side routing.

**UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling. The design implements a dark cyberpunk theme with custom color schemes defined in CSS variables.

**State Management**: Zustand for client-side state management, with separate stores for authentication and mock guild data. TanStack Query (React Query) handles server state and API caching.

**Routing Structure**: 
- `/` - Landing page with hero section
- `/features` - Feature showcase
- `/commands` - Bot command documentation
- `/dashboard` - Guild selection for authenticated users
- `/dashboard/:id` - Individual guild settings page

**Design System**: Custom design tokens using CSS variables for colors, with a "new-york" style variant from Shadcn. The theme uses Orbitron for display text and Inter for body text, creating a futuristic aesthetic.

### Backend Architecture

**Framework**: Express.js with TypeScript running in ESM mode.

**Session Management**: PostgreSQL-backed sessions using `connect-pg-simple`. Sessions store `userId` and `accessToken` for authenticated users.

**Authentication Flow**: Discord OAuth integration (currently mocked for development). The system authenticates users via Discord, stores their access tokens, and validates admin permissions for guild access.

**API Structure**:
- `/api/auth/*` - Authentication endpoints (login, logout, current user)
- `/api/guilds` - Fetch user's guilds with admin permissions
- `/api/guilds/:id` - Get/update specific guild settings

**Middleware**: Session middleware with PostgreSQL store, JSON body parsing with raw body preservation for webhooks, and authentication guards for protected routes.

### Data Storage

**Database**: PostgreSQL accessed via Neon serverless driver for edge compatibility.

**ORM**: Drizzle ORM with schema-first design. Migrations stored in `/migrations` directory.

**Schema Design**:
- `users` table: Stores Discord user data including OAuth tokens with expiry tracking
- `guildSettings` table: Per-guild configuration including prefix, volume, DJ role, and audio filter settings (bass boost, nightcore, vaporwave)
- Session table: Auto-created by `connect-pg-simple` for session storage

**Data Access Pattern**: Repository pattern implemented through `DatabaseStorage` class in `server/storage.ts`, providing abstraction over database operations.

### Build & Deployment

**Development**: Vite dev server on port 5000 for frontend, tsx-node for backend with hot reload.

**Production Build**: Two-stage build process:
1. Vite builds React frontend to `dist/public`
2. esbuild bundles server code to `dist/index.cjs` with selective dependency bundling (allowlist for commonly used packages to reduce cold start times)

**Static File Serving**: Production mode serves built frontend from Express, with fallback to `index.html` for client-side routing.

## External Dependencies

### Discord Integration

**Discord.js v14**: Not directly used in the web application but included for potential bot integration. The bot source code is located in `attached_assets/bot_source/discord-music-bot/`.

**Discord OAuth**: Uses Discord's OAuth2 flow for user authentication. The system fetches user profiles and guild memberships via Discord API v10.

**Permission System**: Checks for administrator permissions (0x8 bit flag) to determine if users can manage guild settings.

**API Endpoints Used**:
- `GET /users/@me` - Fetch authenticated user data
- `GET /users/@me/guilds` - Fetch user's guild list
- Discord CDN for avatars and guild icons

### Database

**Neon Serverless PostgreSQL**: Serverless PostgreSQL provider using `@neondatabase/serverless` driver for edge-compatible database access.

**Connection**: Single connection string via `DATABASE_URL` environment variable.

### UI Component Libraries

**Radix UI**: Headless component primitives for accessibility and interaction patterns (dialogs, dropdowns, popovers, etc.).

**Tailwind CSS**: Utility-first CSS framework with custom configuration for the design system.

**Framer Motion**: Animation library for page transitions and interactive elements.

**Lucide React**: Icon library for consistent iconography throughout the application.

### Development Tools

**Replit Integration**: Custom Vite plugins for Replit-specific features:
- Runtime error overlay
- Cartographer (development navigation)
- Dev banner
- Meta image updater for OpenGraph tags

**TypeScript**: Strict mode enabled with path aliases for clean imports (`@/`, `@shared/`, `@assets/`).

### Session & Security

**express-session**: Session management middleware.

**connect-pg-simple**: PostgreSQL session store adapter.

**Environment Variables**:
- `DATABASE_URL` - PostgreSQL connection string (required)
- `SESSION_SECRET` - Session encryption key (defaults to development value)
- `DISCORD_CLIENT_ID` & `DISCORD_CLIENT_SECRET` - For OAuth (not yet implemented in production)

### Music Bot Integration

The application includes source code for a separate Discord music bot (`attached_assets/bot_source/discord-music-bot/`) that would connect to the same database to read guild settings. The bot uses:
- `@discordjs/voice` for audio playback
- `ytdl-core` for YouTube audio streaming
- `ffmpeg-static` for audio processing
- High-quality audio settings (384kbps, 48kHz sample rate)

The bot is designed to read settings from the `guildSettings` table that are configured through the web dashboard.