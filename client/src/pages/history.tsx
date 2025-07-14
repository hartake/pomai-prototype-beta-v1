import { Card, CardContent } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/use-local-storage";
import SessionHistory from "@/components/session-history";
import type { Session } from "@shared/schema";

export default function History() {
  const [sessions] = useLocalStorage<Session[]>("pomia-sessions", []);
  const [userProgress] = useLocalStorage("pomia-progress", {
    totalPoints: 0,
    totalSessions: 0,
    totalHours: 0,
    currentStreak: 0,
  });

  const formatHours = (minutes: number) => {
    const hours = minutes / 60;
    return hours.toFixed(1) + "h";
  };

  const getCompletedSessions = () => {
    return sessions.filter(session => session.completed).length;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[var(--pomia-text)] mb-2">Session History</h1>
        <p className="text-gray-600">Track your progress and celebrate your achievements</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-pomia-primary mb-2">
              {getCompletedSessions()}
            </div>
            <div className="text-gray-600">Completed Sessions</div>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-pomia-secondary mb-2">
              {formatHours(userProgress.totalHours)}
            </div>
            <div className="text-gray-600">Hours Focused</div>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-pomia-accent mb-2">
              {userProgress.currentStreak}
            </div>
            <div className="text-gray-600">Current Streak</div>
          </CardContent>
        </Card>
      </div>

      {/* Session History List */}
      <SessionHistory sessions={sessions} />
    </div>
  );
}
