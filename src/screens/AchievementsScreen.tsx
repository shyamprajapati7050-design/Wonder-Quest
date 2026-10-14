import React from 'react';
import { useGame } from '../context/GameContext';
import { BADGES } from '../data/shopItems';
import {
  Trophy,
  Award,
  Star,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Sparkles,
  Flame,
  Zap,
  ShieldCheck,
  Compass,
} from 'lucide-react';

export const AchievementsScreen: React.FC = () => {
  const { activeChild, setCurrentScreen } = useGame();

  const rarityColors: Record<string, string> = {
    bronze: 'from-amber-700 to-amber-900 border-amber-600 text-amber-200',
    silver: 'from-slate-400 to-slate-600 border-slate-300 text-slate-100',
    gold: 'from-amber-400 to-yellow-500 border-amber-300 text-amber-950',
    diamond: 'from-cyan-400 to-blue-500 border-cyan-300 text-blue-950',
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('home_dashboard')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        <span className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-full">
          {activeChild.earnedBadges.length} of {BADGES.length} Badges Claimed
        </span>
      </div>

      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Hall of Achievements
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Celebrate your learning milestones, streaks, flawless 25/25 scores, and Master Test triumphs!
        </p>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {BADGES.map((badge) => {
          const isEarned = activeChild.earnedBadges.includes(badge.id);

          return (
            <div
              key={badge.id}
              className={`rounded-3xl p-6 border-2 transition-all flex flex-col justify-between ${
                isEarned
                  ? 'bg-white border-slate-200 shadow-md hover:shadow-lg'
                  : 'bg-slate-50/70 border-slate-200/80 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${
                      rarityColors[badge.rarity]
                    } flex items-center justify-center shadow-md`}
                  >
                    <Award className="w-7 h-7" />
                  </div>

                  {isEarned ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                      <Lock className="w-3 h-3" /> Locked
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    {badge.rarity} · {badge.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-heading">
                  {badge.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {badge.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>WonderQuest Recognition</span>
                <span className="font-semibold text-slate-600 capitalize">
                  {badge.rarity} Badge
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
