import React from 'react';

interface ProgressRingProps {
  progress: number; // Value between 0 and 1
  size?: number; // Diameter of the ring in pixels
  strokeWidth?: number; // Thickness of the ring stroke
  ringColor?: string; // Color of the progress ring
  trackColor?: string; // Color of the background track
  textColor?: string; // Color of the percentage text
  showText?: boolean; // Whether to show the percentage text
  className?: string; // Additional classes for the container
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 60,
  strokeWidth = 5,
  ringColor = "#4f46e5", // indigo-600
  trackColor = "#e5e7eb", // gray-200
  textColor = "#4338ca", // indigo-700
  showText = true,
  className = ""
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Ensure progress is between 0 and 1
  const normalizedProgress = Math.max(0, Math.min(1, progress));
  const offset = circumference - normalizedProgress * circumference;

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={normalizedProgress * 100}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress ring circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={ringColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.35s ease-in-out' }}
        />
      </svg>
      {showText && (
        <span
          className="absolute text-xs sm:text-sm font-bold"
          style={{ color: textColor }}
        >
          {`${(normalizedProgress * 100).toFixed(0)}%`}
        </span>
      )}
    </div>
  );
};
