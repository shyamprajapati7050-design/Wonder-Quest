import React from 'react';

interface StreakFlameIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  animated?: boolean;
  className?: string;
  showGlow?: boolean;
}

export const StreakFlameIcon: React.FC<StreakFlameIconProps> = ({
  size = 'md',
  animated = true,
  className = '',
  showGlow = true,
}) => {
  const sizeMap = {
    sm: { container: 'w-5 h-5', svg: 20 },
    md: { container: 'w-8 h-8', svg: 32 },
    lg: { container: 'w-12 h-12', svg: 48 },
    xl: { container: 'w-16 h-16', svg: 64 },
    '2xl': { container: 'w-24 h-24', svg: 96 },
  };

  const { container, svg } = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${container} ${
        animated ? 'animate-flame-flicker' : ''
      } ${className}`}
      aria-label="Streak Flame Icon"
    >
      {/* Background radial glow */}
      {showGlow && (
        <div className="absolute inset-0 rounded-full bg-orange-500/25 blur-md pointer-events-none -z-10 animate-pulse" />
      )}

      {/* High-fidelity layered SVG flame */}
      <svg
        width={svg}
        height={svg}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm select-none"
      >
        <defs>
          {/* Outer Fire Gradient */}
          <linearGradient id="flameOuter" x1="24" y1="4" x2="24" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="45%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          {/* Mid Fire Gradient */}
          <linearGradient id="flameMid" x1="24" y1="14" x2="24" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>

          {/* Inner Core Gradient */}
          <linearGradient id="flameInner" x1="24" y1="24" x2="24" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#FEF08A" />
          </linearGradient>

          {/* Particle Spark Gradient */}
          <radialGradient id="sparkGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Flame Tongue */}
        <path
          d="M24 4C24 4 29 11 29 16C29 19 27.5 21 26 23C27.5 21 31 19 33 22C36 26.5 35 34 31 38C27 42 21 42 17 38C13 34 12 26 16 20C17.5 17.5 19 16 19 13C19 9 24 4 24 4Z"
          fill="url(#flameOuter)"
        />

        {/* Mid Flame Layer */}
        <path
          d="M24 14C24 14 27.5 19 27.5 23C27.5 25.5 26 27 24.5 28.5C25.5 27.5 28.5 26.5 29.5 29C31 32 29.5 37 26.5 39.5C23.5 42 19 41 17 38C15 35 15.5 29 18 24.5C19 22.5 20.5 21 20.5 19C20.5 16 24 14 24 14Z"
          fill="url(#flameMid)"
        />

        {/* Inner Heart of the Flame */}
        <path
          d="M24 24C24 24 26 27.5 26 30.5C26 32 25 33 24 34C24.5 33.5 26.5 33 27 34.5C27.8 36.5 26 39.5 24 40C22 40.5 19.5 39 19 37C18.5 35 19 31.5 20.5 29C21.2 27.8 22 26.5 22 25.5C22 24.5 24 24 24 24Z"
          fill="url(#flameInner)"
        />

        {/* Dancing Fire Spark Dots */}
        <circle cx="15" cy="12" r="1.5" fill="#FDE047" opacity="0.85" />
        <circle cx="34" cy="16" r="1.8" fill="#FBBF24" opacity="0.9" />
        <circle cx="21" cy="7" r="1.2" fill="#FEF08A" opacity="0.95" />
        <circle cx="30" cy="9" r="1" fill="#F59E0B" opacity="0.8" />
      </svg>
    </div>
  );
};
