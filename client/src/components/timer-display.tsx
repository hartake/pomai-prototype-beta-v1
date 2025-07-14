interface TimerDisplayProps {
  minutes: number;
  seconds: number;
  progressPercentage: number;
  isRunning: boolean;
  isPaused: boolean;
}

export default function TimerDisplay({ 
  minutes, 
  seconds, 
  progressPercentage, 
  isRunning, 
  isPaused 
}: TimerDisplayProps) {
  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatus = () => {
    if (isRunning) return "Running...";
    if (isPaused) return "Paused";
    return "Ready to start";
  };

  const strokeDasharray = 703.72;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * progressPercentage) / 100;

  return (
    <div className="text-center mb-8">
      <div className="relative inline-block">
        <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 256 256">
          <circle 
            cx="128" 
            cy="128" 
            r="112" 
            stroke="#f3f4f6" 
            strokeWidth="8" 
            fill="none"
          />
          <circle 
            cx="128" 
            cy="128" 
            r="112" 
            stroke="var(--pomia-primary)" 
            strokeWidth="8" 
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl font-bold text-[var(--pomia-text)] mb-2">
              {formatTime(minutes, seconds)}
            </div>
            <div className="text-sm text-gray-500 font-medium">
              {getStatus()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
