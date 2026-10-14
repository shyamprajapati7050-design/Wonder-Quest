import React from 'react';
import { useGame } from '../context/GameContext';
import { StreakFlameIcon } from './StreakFlameIcon';
import { STREAK_MILESTONES, getWeeklyStreakHistory } from '../data/streakData';
import { X, Trophy, Sparkles, CheckCircle2, Lock, Flame, Coins, ShieldCheck, Award } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface DailyStreakModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyStreakModal: React.FC<DailyStreakModalProps> = ({ isOpen, onClose }) => {
  const { activeChild, t, language } = useGame();

  if (!isOpen) return null;

  const streakDays = activeChild.streakDays || 1;
  const lastActiveDate = activeChild.lastActiveDate || '';
  const streakHistory = activeChild.streakHistory || [];
  const claimedMilestones = activeChild.claimedStreakRewards || [];

  const weeklyDays = getWeeklyStreakHistory(streakDays, lastActiveDate, streakHistory);

  const handleClose = () => {
    soundEngine.playCardFlip();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-orange-200 overflow-hidden max-h-[90vh] flex flex-col animate-scaleUp">
        {/* Header background with glowing fire gradient */}
        <div className="relative bg-gradient-to-br from-orange-600 via-amber-600 to-red-600 text-white p-6 sm:p-7 text-center">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors cursor-pointer"
            aria-label="Close Streak Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Big animated Streak Flame icon */}
          <div className="mb-3 inline-block">
            <div className="p-3 bg-white/15 backdrop-blur-md rounded-3xl border border-white/20 shadow-inner">
              <StreakFlameIcon size="xl" animated={true} showGlow={true} />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-black uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>{t.streakFlame || 'Streak Flame System'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight drop-shadow-sm">
            {streakDays} {t.streakDaysActive || 'Days Streak!'}
          </h2>

          <p className="text-xs sm:text-sm text-orange-100 max-w-sm mx-auto mt-1">
            You're on fire! Learning every single day builds deep memory, boosts problem solving, and unlocks exclusive rewards!
          </p>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Daily Status Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-emerald-950">
                Today’s Check-in is Active!
              </h4>
              <p className="text-xs text-emerald-800">
                Log in tomorrow to extend your streak to <strong>{streakDays + 1} days</strong> and earn more Wonder Coins!
              </p>
            </div>
          </div>

          {/* 7-Day Rolling Progress Strip */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              Weekly Attendance Flame Tracker
            </h4>
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {weeklyDays.map((day) => (
                <div
                  key={day.dateStr}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                    day.isToday
                      ? 'bg-orange-500 text-white border-orange-600 shadow-md scale-105'
                      : day.isActive
                      ? 'bg-orange-50 border-orange-200 text-orange-950'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <span className={`text-[10px] font-bold ${day.isToday ? 'text-orange-100' : ''}`}>
                    {day.dayLabel}
                  </span>
                  <div className="my-1">
                    {day.isActive ? (
                      <StreakFlameIcon size="sm" animated={day.isToday} />
                    ) : (
                      <span className="inline-block w-4 h-4 rounded-full border-2 border-dashed border-slate-300" />
                    )}
                  </div>
                  <span className="text-[9px] font-bold">
                    {day.isToday ? 'Today' : day.isActive ? 'Done ✓' : '—'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Streak Milestones Roadmap */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              Streak Milestone Badges & Rewards
            </h4>

            <div className="space-y-2.5">
              {STREAK_MILESTONES.map((m) => {
                const isReached = streakDays >= m.days;
                const isClaimed = claimedMilestones.includes(m.days);

                return (
                  <div
                    key={m.days}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                      isReached
                        ? 'bg-amber-50/80 border-amber-300 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 opacity-80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                          isReached
                            ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm'
                            : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {m.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-extrabold text-sm text-slate-900">
                            {language === 'hi' ? m.hindiTitle : m.title}
                          </h5>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">
                            {m.days} Days
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{m.description}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0 pl-2">
                      <div className="flex items-center justify-end gap-1 text-xs font-bold text-amber-700">
                        <Coins className="w-3.5 h-3.5 fill-amber-400" />
                        <span>+{m.rewardCoins}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-blue-600 block">
                        +{m.rewardXp} XP
                      </span>
                      {isReached ? (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full mt-1">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          Unlocked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full mt-1">
                          <Lock className="w-2.5 h-2.5" />
                          {m.days - streakDays}d Left
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Keep practicing daily to never lose your flame!
          </span>
          <button
            onClick={handleClose}
            className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            Keep Learning
          </button>
        </div>
      </div>
    </div>
  );
};
