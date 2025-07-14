interface ProgressBarProps {
  currentPoints: number;
  maxPoints?: number;
}

export default function ProgressBar({ currentPoints, maxPoints = 100 }: ProgressBarProps) {
  const percentage = Math.min((currentPoints / maxPoints) * 100, 100);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-600">Progress</span>
        <span className="text-sm font-bold text-pomia-primary">
          {currentPoints}/{maxPoints} points
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className="bg-gradient-to-r from-[var(--pomia-primary)] to-[var(--pomia-secondary)] h-3 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
