import { type Session, type InsertSession, type UserProgress, type InsertUserProgress } from "@shared/schema";

// Storage interface for Pomia Pomodoro timer
export interface IStorage {
  // Session methods
  createSession(session: InsertSession): Promise<Session>;
  getSessions(): Promise<Session[]>;
  
  // User progress methods
  getUserProgress(): Promise<UserProgress | undefined>;
  updateUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
}

export class MemStorage implements IStorage {
  private sessions: Map<number, Session>;
  private userProgress: UserProgress | null;
  private currentSessionId: number;

  constructor() {
    this.sessions = new Map();
    this.userProgress = null;
    this.currentSessionId = 1;
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const id = this.currentSessionId++;
    const session: Session = {
      id,
      duration: insertSession.duration,
      actualDuration: insertSession.actualDuration ?? null,
      memo: insertSession.memo ?? null,
      points: insertSession.points ?? 0,
      completed: insertSession.completed ?? false,
      startedAt: new Date(),
      completedAt: null,
    };
    this.sessions.set(id, session);
    return session;
  }

  async getSessions(): Promise<Session[]> {
    return Array.from(this.sessions.values()).sort((a, b) => 
      new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
    );
  }

  async getUserProgress(): Promise<UserProgress | undefined> {
    return this.userProgress || undefined;
  }

  async updateUserProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const updatedProgress: UserProgress = {
      id: 1,
      totalPoints: progress.totalPoints ?? 0,
      totalSessions: progress.totalSessions ?? 0,
      totalHours: progress.totalHours ?? 0,
      currentStreak: progress.currentStreak ?? 0,
    };
    this.userProgress = updatedProgress;
    return updatedProgress;
  }
}

export const storage = new MemStorage();
