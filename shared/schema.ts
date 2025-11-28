import { pgTable, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table to store Discord user info from OAuth
export const users = pgTable("users", {
  id: text("id").primaryKey(), // Discord user ID
  username: text("username").notNull(),
  discriminator: text("discriminator").notNull(),
  avatar: text("avatar"),
  email: text("email"),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  tokenExpiry: timestamp("token_expiry"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Guild settings table
export const guildSettings = pgTable("guild_settings", {
  id: text("id").primaryKey(), // Discord guild ID
  guildName: text("guild_name").notNull(),
  guildIcon: text("guild_icon"),
  prefix: text("prefix").notNull().default("m!"),
  volume: integer("volume").notNull().default(100),
  djRole: text("dj_role"),
  bassBoost: boolean("bass_boost").notNull().default(false),
  nightcore: boolean("nightcore").notNull().default(false),
  vaporwave: boolean("vaporwave").notNull().default(false),
  songsPlayed: integer("songs_played").notNull().default(0),
  usersJamming: integer("users_jamming").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertGuildSettingsSchema = createInsertSchema(guildSettings).omit({
  createdAt: true,
  updatedAt: true,
});

// Update schemas
export const updateGuildSettingsSchema = insertGuildSettingsSchema.partial().required({ id: true });

// Select types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type GuildSettings = typeof guildSettings.$inferSelect;
export type InsertGuildSettings = z.infer<typeof insertGuildSettingsSchema>;
export type UpdateGuildSettings = z.infer<typeof updateGuildSettingsSchema>;
