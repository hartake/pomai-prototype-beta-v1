import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useTimer } from "@/hooks/use-timer";
import TimerDisplay from "@/components/timer-display";
import ProgressBar from "@/components/progress-bar";

export default function Timer() {
  const [customMinutes, setCustomMinutes] = useState("");
  const [selectedPreset, setSelectedPreset] = useState(25);

  const {
    timerState,
    userProgress,
    progressPercentage,
    startTimer,
    pauseTimer,
    resetTimer,
    setDuration,
    setMemo,
  } = useTimer();

  const handlePresetClick = (minutes: number) => {
    setSelectedPreset(minutes);
    setDuration(minutes);
  };

  const handleCustomTimer = () => {
    const minutes = parseInt(customMinutes);
    if (minutes && minutes > 0 && minutes <= 120) {
      setSelectedPreset(0); // Clear preset selection
      setDuration(minutes);
      setCustomMinutes("");
    }
  };

  const handleMemoChange = (value: string) => {
    if (value.length <= 200) {
      setMemo(value);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header with Progress */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[var(--pomia-text)] mb-2">Pomia</h1>
        <p className="text-gray-600 mb-6">Focus. Work. Grow.</p>
        
        <ProgressBar currentPoints={userProgress.totalPoints} />
      </div>

      {/* Main Timer Card */}
      <Card className="rounded-2xl shadow-lg mb-6">
        <CardContent className="p-8">
          {/* Timer Display */}
          <TimerDisplay
            minutes={timerState.minutes}
            seconds={timerState.seconds}
            progressPercentage={progressPercentage}
            isRunning={timerState.isRunning}
            isPaused={timerState.isPaused}
          />

          {/* Timer Presets */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Button
              onClick={() => handlePresetClick(15)}
              variant={selectedPreset === 15 ? "default" : "outline"}
              className={`py-3 px-4 rounded-xl transition-all duration-200 ${
                selectedPreset === 15 
                  ? "pomia-primary text-white shadow-md" 
                  : "bg-gray-100 hover:pomia-primary hover:text-white text-[var(--pomia-text)]"
              }`}
            >
              15 min
            </Button>
            <Button
              onClick={() => handlePresetClick(25)}
              variant={selectedPreset === 25 ? "default" : "outline"}
              className={`py-3 px-4 rounded-xl transition-all duration-200 ${
                selectedPreset === 25 
                  ? "pomia-primary text-white shadow-md" 
                  : "bg-gray-100 hover:pomia-primary hover:text-white text-[var(--pomia-text)]"
              }`}
            >
              25 min
            </Button>
            <Button
              onClick={() => handlePresetClick(60)}
              variant={selectedPreset === 60 ? "default" : "outline"}
              className={`py-3 px-4 rounded-xl transition-all duration-200 ${
                selectedPreset === 60 
                  ? "pomia-primary text-white shadow-md" 
                  : "bg-gray-100 hover:pomia-primary hover:text-white text-[var(--pomia-text)]"
              }`}
            >
              1 hour
            </Button>
          </div>

          {/* Custom Timer Input */}
          <div className="mb-6">
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Duration
            </Label>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Minutes"
                min="1"
                max="120"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[var(--pomia-primary)] focus:border-transparent"
              />
              <Button
                onClick={handleCustomTimer}
                className="px-6 py-3 pomia-accent text-white rounded-xl hover:bg-opacity-90 transition-colors"
              >
                Set
              </Button>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              onClick={startTimer}
              disabled={timerState.isRunning}
              className="px-8 py-4 pomia-primary text-white font-semibold rounded-xl hover:bg-opacity-90 transition-colors shadow-md"
            >
              <Play className="w-4 h-4 mr-2" />
              {timerState.isPaused ? "Resume" : "Start"}
            </Button>
            <Button
              onClick={pauseTimer}
              disabled={!timerState.isRunning}
              className="px-8 py-4 bg-gray-500 text-white font-semibold rounded-xl hover:bg-opacity-90 transition-colors"
            >
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
            <Button
              onClick={resetTimer}
              variant="outline"
              className="px-6 py-4 bg-gray-300 text-[var(--pomia-text)] font-semibold rounded-xl hover:bg-gray-400 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress Memo */}
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <Label className="block text-lg font-semibold text-[var(--pomia-text)] mb-3">
            Session Notes
          </Label>
          <Textarea
            value={timerState.sessionMemo}
            onChange={(e) => handleMemoChange(e.target.value)}
            placeholder="What are you working on? Document your progress here..."
            className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[var(--pomia-primary)] focus:border-transparent resize-none h-24"
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-gray-500">
              Completing sessions with notes earns more points!
            </span>
            <span className="text-sm text-gray-400">
              {timerState.sessionMemo.length}/200
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
