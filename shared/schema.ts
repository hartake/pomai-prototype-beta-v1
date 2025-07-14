import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  duration: integer("duration").notNull(), // duration in minutes
  actualDuration: integer("actual_duration"), // actual time spent if session was interrupted
  memo: text("memo"),
  points: integer("points").notNull().default(0),
  completed: boolean("completed").notNull().default(false),
  startedAt: timestamp("started_at").notNull(),
  completedAt: timestamp("completed_at"),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  totalPoints: integer("total_points").notNull().default(0),
  totalSessions: integer("total_sessions").notNull().default(0),
  totalHours: integer("total_hours").notNull().default(0), // in minutes for precision
  currentStreak: integer("current_streak").notNull().default(0),
});

export const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
  startedAt: true,
  completedAt: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
});

export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessions.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
