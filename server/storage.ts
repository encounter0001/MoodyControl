import { 
  type User, 
  type InsertUser,
  type GuildSettings,
  type InsertGuildSettings,
  type UpdateGuildSettings,
  users,
  guildSettings
} from "@shared/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;
  
  // Guild settings operations
  getGuildSettings(guildId: string): Promise<GuildSettings | undefined>;
  createGuildSettings(settings: InsertGuildSettings): Promise<GuildSettings>;
  updateGuildSettings(guildId: string, settings: Partial<UpdateGuildSettings>): Promise<GuildSettings | undefined>;
  getAllGuildSettings(): Promise<GuildSettings[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async updateUser(id: string, updateData: Partial<InsertUser>): Promise<User | undefined> {
    const result = await db
      .update(users)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return result[0];
  }

  // Guild settings operations
  async getGuildSettings(guildId: string): Promise<GuildSettings | undefined> {
    const result = await db
      .select()
      .from(guildSettings)
      .where(eq(guildSettings.id, guildId))
      .limit(1);
    return result[0];
  }

  async createGuildSettings(settings: InsertGuildSettings): Promise<GuildSettings> {
    const result = await db.insert(guildSettings).values(settings).returning();
    return result[0];
  }

  async updateGuildSettings(
    guildId: string, 
    updateData: Partial<UpdateGuildSettings>
  ): Promise<GuildSettings | undefined> {
    const result = await db
      .update(guildSettings)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(guildSettings.id, guildId))
      .returning();
    return result[0];
  }

  async getAllGuildSettings(): Promise<GuildSettings[]> {
    return await db.select().from(guildSettings);
  }
}

export const storage = new DatabaseStorage();
