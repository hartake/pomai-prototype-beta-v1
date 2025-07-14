import { CheckCircle, XCircle } from "lucide-react";
import type { Session } from "@shared/schema";

interface SessionHistoryProps {
  sessions: Session[];
}

export default function SessionHistory({ sessions }: SessionHistoryProps) {
  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return `Today, ${d.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      })}`;
    } else if (diffInDays === 1) {
      return `Yesterday, ${d.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      })}`;
    } else {
      return `${diffInDays} days ago, ${d.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      })}`;
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 
        ? `${hours}h ${remainingMinutes}m`
        : `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  };

  const getBorderColor = (points: number) => {
    if (points >= 20) return "border-pomia-primary";
    if (points >= 15) return "border-pomia-success";
    if (points >= 10) return "border-pomia-secondary";
    if (points > 0) return "border-pomia-accent";
    return "border-gray-300";
  };

  const getStatusColor = (completed: boolean, points: number) => {
    if (!completed) return "bg-gray-400";
    if (points >= 20) return "pomia-primary";
    if (points >= 15) return "pomia-success";
    if (points >= 10) return "pomia-secondary";
    return "pomia-accent";
  };

  const getPointsColor = (points: number) => {
    if (points >= 20) return "text-pomia-primary";
    if (points >= 15) return "text-pomia-success";
    if (points >= 10) return "text-pomia-secondary";
    if (points > 0) return "text-pomia-accent";
    return "text-gray-400";
  };

  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No sessions yet</div>
        <div className="text-gray-500">Start your first Pomodoro session to see your progress here!</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <div 
          key={session.id} 
          className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${getBorderColor(session.points)}`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-lg font-semibold text-[var(--pomia-text)]">
                  {formatDuration(session.duration)}
                </span>
                <span className={`text-white text-xs px-2 py-1 rounded-full ${getStatusColor(session.completed, session.points)}`}>
                  {session.completed ? "Completed" : "Incomplete"}
                </span>
                <span className={`font-bold ${getPointsColor(session.points)}`}>
                  {session.completed ? `+${session.points}` : `+0`} points
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">
                {formatDate(session.startedAt)}
              </p>
              {session.memo ? (
                <p className="text-gray-700">
                  {session.memo}
                </p>
              ) : (
                <p className="text-gray-500 italic">
                  {session.completed ? "No notes added" : "Session was interrupted"}
                </p>
              )}
            </div>
            {session.completed ? (
              <CheckCircle className={`text-xl ml-4 ${getPointsColor(session.points)}`} size={20} />
            ) : (
              <XCircle className="text-gray-400 text-xl ml-4" size={20} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
