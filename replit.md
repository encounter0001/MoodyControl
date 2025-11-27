# Moody Music Bot - Discord Music Bot Dashboard

## Overview

Moody Music Bot is a full-stack web application providing a premium dashboard for managing a Discord music bot. The application allows Discord server administrators to configure bot settings, manage music playback, and control audio filters through a vibrant, modern web interface. The system consists of a React-based frontend with a bold "Vibrant Rich Theme" design and an Express backend that handles session management and guild settings.

**Current Live**: https://moodymusicbot.pages.dev/
**Discord OAuth Bot**: https://discord.com/oauth2/authorize?client_id=1344874349580255293&permissions=321609335434304&integration_type=0&scope=bot
**Support Server**: https://discord.com/servers/wyno-is-live-1129884940385914880

## User Preferences

Preferred communication style: Simple, everyday language. Wants crazy, unique, and rich enhanced themes with all working features.

## System Architecture

### Frontend Architecture

**Technology Stack**: React 18 with TypeScript, Vite for bundling, and Wouter for client-side routing.

**UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling. The design implements a vibrant "Vibrant Rich Theme" with gradient accents (pink, orange, cyan) and enhanced glassmorphism effects.

**State Management**: Zustand for client-side authentication state. TanStack Query (React Query) handles server state and API caching.

**Routing Structure**: 
- `/` - Landing page with hero section and feature showcase
- `/features` - Feature showcase with detailed descriptions
- `/commands` - Command documentation with search functionality
- `/dashboard` - Guild selection for authenticated users
- `/dashboard/:id` - Individual guild settings page

**Design System**: Bold vibrant theme using CSS variables for dynamic colors with gradients (pink → orange → cyan). Uses Space Grotesk for display text and Inter for body text with animated borders and hover effects.

### Backend Architecture

**Framework**: Express.js with TypeScript running in ESM mode.

**Session Management**: PostgreSQL-backed sessions using `connect-pg-simple`. Sessions store `userId` and `accessToken` for authenticated users.

**Authentication Flow**: Discord OAuth integration (currently mocked for development). Session-based authentication with mock user data.

**API Structure**:
- `/api/auth/*` - Authentication endpoints (login, logout, current user)
- `/api/guilds` - Fetch user's guilds (mocked for dev)
- `/api/guilds/:id/settings` - Get/update specific guild settings

**Middleware**: Session middleware with PostgreSQL store, JSON body parsing, and authentication guards.

### Data Storage

**Database**: PostgreSQL accessed via Neon serverless driver.

**ORM**: Drizzle ORM with schema-first design.

**Schema Design**:
- `users` table: Discord user data (id, username, discriminator, avatar, tokens)
- `guildSettings` table: Per-guild configuration (prefix, volume, filters: bassBoost, nightcore, vaporwave)
- Session table: Auto-created by `connect-pg-simple`

**Data Access Pattern**: Repository pattern via `DatabaseStorage` class in `server/storage.ts`.

### Build & Deployment

**Development**: Vite dev server on port 5000, tsx-node for backend with hot reload.

**Production Build**: Two-stage (Vite for frontend, esbuild for server code).

**Static File Serving**: Production serves built frontend from Express with fallback to `index.html`.

## External Dependencies

### Discord Integration

**Discord OAuth**: Uses Discord's OAuth2 flow. Bot invite link: `https://discord.com/oauth2/authorize?client_id=1344874349580255293&permissions=321609335434304&integration_type=0&scope=bot`

**Support Server**: https://discord.com/servers/wyno-is-live-1129884940385914880

### UI Component Libraries

**Radix UI**: Headless components for accessibility.
**Tailwind CSS**: Utility-first CSS framework with custom theme.
**Framer Motion**: Animation library for transitions.
**Lucide React**: Icon library (Wind, Music, Zap, Shield, etc.).

### Database

**Neon PostgreSQL**: Serverless PostgreSQL via `@neondatabase/serverless`.

### Session & Security

**express-session**: Session management.
**connect-pg-simple**: PostgreSQL session adapter.
**Environment Variables**: DATABASE_URL, SESSION_SECRET.

## Features Implemented

✅ **Dashboard Features**:
- Guild selection with admin-only filtering
- Real-time guild settings management
- Prefix customization (1-5 characters)
- Volume control (0-200%)
- Audio filters: Bass Boost, Nightcore, Vaporwave toggle
- Beautiful gradient UI with hover effects

✅ **Pages**:
- Home: Hero section with stats and feature grid
- Features: Detailed feature showcase
- Commands: Searchable command documentation
- Dashboard: Guild management
- Guild Settings: Per-guild configuration

✅ **Design**:
- Vibrant gradient theme (pink, orange, cyan)
- Glassmorphism effects
- Animated borders and hover glows
- Responsive design (mobile, tablet, desktop)
- Dark background with accent lighting

## Pending / Future Features

- Real Discord OAuth integration (currently mocked)
- Queue management visualization
- Real-time bot status
- Premium features and subscription system
- Bot statistics dashboard
