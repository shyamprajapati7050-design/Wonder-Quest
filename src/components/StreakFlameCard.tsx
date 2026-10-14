import React from 'react';
import { useGame } from '../context/GameContext';
import { StreakFlameIcon } from './StreakFlameIcon';
import {
  getWeeklyStreakHistory,
  STREAK_MILESTONES,
  StreakMilestone,
} from '../data/streakData';
import { Sparkles, Trophy, Check, ArrowRight, Award } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface StreakFlameCardProps {
  onOpenModal?: () => void;
  compact?: boolean;
}

export const StreakFlameCard: React.FC<StreakFlameCardProps> = ({
  onOpenModal,
  compact = false,
}) => {
  const { activeChild, setIsStreakModalOpen, t, language } = useGame();

  const streakDays = activeChild.streakDays || 1;
  const lastActiveDate = activeChild.lastActiveDate || '';
  const streakHistory = activeChild.streakHistory || [];

  const weeklyDays = getWeeklyStreakHistory(streakDays, lastActiveDate, streakHistory);

  // Next milestone to reach
  const nextMilestone: StreakMilestone | undefined = STREAK_MILESTONES.find(
    (m) => m.days > streakDays
  ) || STREAK_MILESTONES[STREAK_MILESTONES.length - 1];

  const daysToNext = nextMilestone ? Math.max(1, nextMilestone.days - streakDays) : 0;

  const handleCardClick = () => {
    soundEngine.playCardFlip();
    if (onOpenModal) onOpenModal();
    else setIsStreakModalOpen(true);
  };

  if (compact) {
    return (
      <button
        onClick={handleCardClick}
        className="w-full bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100 hover:from-orange-100 hover:to-amber-100 p-3.5 rounded-2xl border border-orange-200/80 shadow-xs flex items-center justify-between transition-all cursor-pointer group text-left"
      >
        <div className="flex items-center gap-3">
          <StreakFlameIcon size="md" animated={true} />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm text-slate-900 font-heading">
                {streakDays} {t.streakDaysActive || 'Day Streak'}
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-orange-500 text-white shadow-2xs">
                Active Today
              </span>
            </div>
            <p className="text-[11px] text-orange-950 font-medium">
              {daysToNext > 0
                ? `${daysToNext} days to ${nextMilestone?.title}`
                : 'Streak Milestone Complete!'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-orange-700 group-hover:translate-x-1 transition-transform">
          <span>Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </button>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50/90 via-amber-50/80 to-red-50/90 border-2 border-orange-200/80 p-5 sm:p-6 shadow-md transition-all hover:shadow-lg">
      {/* Decorative fire glow in background */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-400/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Left: Flame Icon & Big Streak Headline */}
        <div className="flex items-start sm:items-center gap-4">
          <div className="p-2 sm:p-2.5 rounded-2xl bg-gradient-to-b from-orange-500/10 to-amber-500/20 border border-orange-200/60 shadow-xs">
            <StreakFlameIcon size="lg" animated={true} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full border border-orange-200 flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {t.streakFlame || 'Streak Flame'}
              </span>
              <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                {t.streakActiveToday || 'Active Today!'}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading tracking-tight flex items-center gap-2">
              <span>{streakDays} Day Learning Streak!</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 mt-0.5 max-w-md">
              Keep the flame burning bright! Every consecutive day of practice sharpens your mind and earns bonus coins!
            </p>
          </div>
        </div>

        {/* Right: Next Milestone & Action */}
        <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3 shrink-0">
          {nextMilestone && (
            <div className="bg-white/80 backdrop-blur-xs border border-orange-200 px-3.5 py-2 rounded-2xl text-left md:text-right shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 block">
                Next Milestone ({nextMilestone.days} Days)
              </span>
              <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5 md:justify-end">
                <span>{nextMilestone.icon}</span>
                <span>{language === 'hi' ? nextMilestone.hindiTitle : nextMilestone.title}</span>
                <span className="text-amber-700 font-bold text-[11px]">
                  (+{nextMilestone.rewardCoins} 🪙)
                </span>
              </span>
            </div>
          )}

          <button
            onClick={handleCardClick}
            className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold rounded-xl shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <Trophy className="w-4 h-4" />
            <span>View Streak Milestones</span>
          </button>
        </div>
      </div>

      {/* 7-Day Rolling Streak Tracker Bar */}
      <div className="relative z-10 mt-5 pt-4 border-t border-orange-200/60">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
          <span className="text-[11px] font-bold text-orange-900 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Last 7 Days Progress
          </span>
          <span className="text-[11px] font-medium text-slate-500">
            {streakDays >= 7 ? '🔥 Week Completed!' : `${streakDays} of 7 days towards week badge`}
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {weeklyDays.map((day, idx) => (
            <div
              key={day.dateStr}
              className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                day.isToday
                  ? 'bg-gradient-to-b from-orange-500 to-amber-500 text-white border-orange-400 shadow-md scale-105'
                  : day.isActive
                  ? 'bg-orange-100/90 border-orange-300 text-orange-950 font-bold'
                  : 'bg-white/60 border-slate-200 text-slate-400'
              }`}
            >
              <span className={`text-[10px] font-extrabold uppercase ${day.isToday ? 'text-amber-100' : ''}`}>
                {day.dayLabel}
              </span>
              <div className="my-1">
                {day.isActive ? (
                  <StreakFlameIcon
                    size="sm"
                    animated={day.isToday}
                    showGlow={day.isToday}
                  />
                ) : (
                  <span className="inline-block w-4 h-4 rounded-full border-2 border-dashed border-slate-300" />
                )}
              </div>
              <span
                className={`text-[9px] font-black ${
                  day.isToday ? 'text-white' : day.isActive ? 'text-orange-800' : 'text-slate-400'
                }`}
              >
                {day.isToday ? 'Today' : day.isActive ? 'Done ✓' : '—'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
