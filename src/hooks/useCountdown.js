import { useState, useEffect, useCallback } from 'react';

export function useCountdown(initialSeconds = 30) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [endTime, setEndTime] = useState(null);

  const start = useCallback(() => {
    setEndTime(Date.now() + initialSeconds * 1000);
    setSecondsLeft(initialSeconds);
    setIsRunning(true);
  }, [initialSeconds]);

  const stop = useCallback(() => {
    setIsRunning(false);
    setEndTime(null);
  }, []);

  const reset = useCallback(() => {
    setSecondsLeft(initialSeconds);
    setIsRunning(false);
    setEndTime(null);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning || !endTime) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
      setSecondsLeft(remaining);
      if (remaining <= 0) {
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, endTime]);

  return {
    secondsLeft,
    isRunning,
    isExpired: secondsLeft <= 0 && !isRunning && endTime !== null,
    start,
    stop,
    reset,
    progress: secondsLeft / initialSeconds,
  };
}
