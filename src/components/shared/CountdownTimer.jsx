export default function CountdownTimer({ seconds = 60, secondsLeft, progress }) {
  // Calculate progress from secondsLeft if not provided directly
  const computedProgress = progress !== undefined
    ? progress
    : seconds > 0
      ? secondsLeft / seconds
      : 0;

  const displaySeconds = secondsLeft !== undefined
    ? secondsLeft
    : Math.round(computedProgress * seconds);

  // SVG circle dimensions
  const size = 120;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - computedProgress);

  // Color thresholds: green >50%, yellow >17%, red <=17%
  let ringColor;
  let textColor;
  if (computedProgress > 0.5) {
    ringColor = '#22C55E'; // success green
    textColor = 'text-success';
  } else if (computedProgress > 0.17) {
    ringColor = '#EAB308'; // warning yellow
    textColor = 'text-warning';
  } else {
    ringColor = '#EF4444'; // emergency red
    textColor = 'text-emergency';
  }

  // Format display: show mm:ss when >= 60s, otherwise just seconds
  const displayText = displaySeconds >= 60
    ? `${Math.floor(displaySeconds / 60)}:${String(displaySeconds % 60).padStart(2, '0')}`
    : String(displaySeconds);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-surface-light)"
          strokeWidth={strokeWidth}
        />
        {/* Foreground animated circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      {/* Center number */}
      <span className={`absolute text-3xl font-bold ${textColor}`}>
        {displayText}
      </span>
    </div>
  );
}
