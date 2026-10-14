import React from 'react';

interface DailyGoalsProgressRingProps {
  progressPercent: number; // 0 to 100
  completedCount: number;
  totalCount: number;
  size?: number; // diameter in px (default 108)
  strokeWidth?: number; // default 9
  showCenterText?: boolean;
  className?: string;
}

export const DailyGoalsProgressRing: React.FC<DailyGoalsProgressRingProps> = ({
  progressPercent,
  completedCount,
  totalCount,
  size = 108,
  strokeWidth = 9,
  showCenterText = true,
  className = '',
}) => {
  const normalizedRadius = (size - strokeWidth * 2) / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, progressPercent)) / 100) * circumference;
  const isComplete = progressPercent >= 100;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={progressPercent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Daily Study Plan Goals: ${completedCount} of ${totalCount} completed (${progressPercent}%)`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90 origin-center"
      >
        <defs>
          {/* Subtle gradient for progress stroke */}
          <linearGradient id="dailyGoalsRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" /> {/* Amber 500 */}
            <stop offset="60%" stopColor="#10B981" /> {/* Emerald 500 */}
            <stop offset="100%" stopColor="#059669" /> {/* Emerald 600 */}
          </linearGradient>

          {/* Glow filter when complete */}
          <filter id="ringCompleteGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Track Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={normalizedRadius}
          stroke="#E2E8F0" // Slate 200
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          className="opacity-70"
        />

        {/* Foreground Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={normalizedRadius}
          stroke="url(#dailyGoalsRingGrad)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          filter={isComplete ? 'url(#ringCompleteGlow)' : undefined}
        />
      </svg>

      {/* Center Percentage & Label */}
      {showCenterText && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
          <span
            className={`font-black font-heading tabular-nums leading-none tracking-tight ${
              isComplete ? 'text-emerald-600' : 'text-slate-900'
            }`}
            style={{ fontSize: size * 0.23 }}
          >
            {isComplete ? '100%' : `${progressPercent}%`}
          </span>
          <span
            className="text-slate-500 font-bold uppercase tracking-wider mt-0.5"
            style={{ fontSize: Math.max(9, Math.round(size * 0.095)) }}
          >
            {isComplete ? 'Done 🎉' : `${completedCount}/${totalCount} Goals`}
          </span>
        </div>
      )}
    </div>
  );
};
