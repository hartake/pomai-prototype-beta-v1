import { useState, useEffect, useCallback, useRef } from "react";
import { useAudio } from "./use-audio";
import { useLocalStorage } from "./use-local-storage";
import type { Session } from "@shared/schema";

interface TimerState {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  isPaused: boolean;
  originalDuration: number;
  sessionMemo: string;
}

export function useTimer() {
  const [timerState, setTimerState] = useState<TimerState>({
    minutes: 25,
    seconds: 0,
    isRunning: false,
    isPaused: false,
    originalDuration: 25,
    sessionMemo: "",
  });

  const [sessions, setSessions] = useLocalStorage<Session[]>("pomia-sessions", []);
  const [userProgress, setUserProgress] = useLocalStorage("pomia-progress", {
    totalPoints: 0,
    totalSessions: 0,
    totalHours: 0,
    currentStreak: 0,
  });

  const { playNotificationSound } = useAudio();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sessionStartTime = useRef<Date | null>(null);

  const calculatePoints = useCallback((durationMinutes: number, hasMemo: boolean) => {
    const basePoints = Math.min(Math.max(Math.floor(durationMinutes / 5), 2), 25);
    return hasMemo ? basePoints : Math.floor(basePoints * 0.6);
  }, []);

  const startTimer = useCallback(() => {
    if (!sessionStartTime.current) {
      sessionStartTime.current = new Date();
    }
    setTimerState(prev => ({ ...prev, isRunning: true, isPaused: false }));
  }, []);

  const pauseTimer = useCallback(() => {
    setTimerState(prev => ({ ...prev, isRunning: false, isPaused: true }));
  }, []);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    sessionStartTime.current = null;
    setTimerState(prev => ({
      ...prev,
      minutes: prev.originalDuration,
      seconds: 0,
      isRunning: false,
      isPaused: false,
    }));
  }, []);

  const setDuration = useCallback((minutes: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    sessionStartTime.current = null;
    setTimerState(prev => ({
      ...prev,
      minutes,
      seconds: 0,
      originalDuration: minutes,
      isRunning: false,
      isPaused: false,
    }));
  }, []);

  const setMemo = useCallback((memo: string) => {
    setTimerState(prev => ({ ...prev, sessionMemo: memo }));
  }, []);

  const completeSession = useCallback(() => {
    const now = new Date();
    const actualDuration = timerState.originalDuration;
    const points = calculatePoints(actualDuration, timerState.sessionMemo.trim().length > 0);

    const newSession: Session = {
      id: Date.now(),
      duration: actualDuration,
      actualDuration,
      memo: timerState.sessionMemo.trim() || null,
      points,
      completed: true,
      startedAt: sessionStartTime.current || now,
      completedAt: now,
    };

    setSessions(prev => [newSession, ...prev]);
    setUserProgress(prev => ({
      totalPoints: prev.totalPoints + points,
      totalSessions: prev.totalSessions + 1,
      totalHours: prev.totalHours + actualDuration,
      currentStreak: prev.currentStreak + 1,
    }));

    playNotificationSound();
    resetTimer();
    setTimerState(prev => ({ ...prev, sessionMemo: "" }));
  }, [timerState.originalDuration, timerState.sessionMemo, calculatePoints, setSessions, setUserProgress, playNotificationSound, resetTimer]);

  useEffect(() => {
    if (timerState.isRunning) {
      intervalRef.current = setInterval(() => {
        setTimerState(prev => {
          if (prev.minutes === 0 && prev.seconds === 0) {
            completeSession();
            return prev;
          }

          if (prev.seconds === 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          } else {
            return { ...prev, seconds: prev.seconds - 1 };
          }
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState.isRunning, completeSession]);

  const progressPercentage = ((timerState.originalDuration * 60 - (timerState.minutes * 60 + timerState.seconds)) / (timerState.originalDuration * 60)) * 100;

  return {
    timerState,
    userProgress,
    sessions,
    progressPercentage,
    startTimer,
    pauseTimer,
    resetTimer,
    setDuration,
    setMemo,
  };
}
