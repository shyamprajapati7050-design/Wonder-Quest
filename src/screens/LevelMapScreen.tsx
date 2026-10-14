import React from 'react';
import { useGame } from '../context/GameContext';
import { ASSET_PATHS } from '../assets/assetRegistry';
import { getGradeDetails } from '../data/gradesData';
import {
  Lock,
  CheckCircle2,
  Star,
  Trophy,
  Sparkles,
  ArrowLeft,
  Play,
  BookOpen,
  Shield,
  HelpCircle,
  School,
  Globe,
} from 'lucide-react';
import { Level } from '../types';
import { useGlobalLanguage } from '../context/GlobalLanguageContext';
import { SUPPORTED_LANGUAGES } from '../data/languages';

export const LevelMapScreen: React.FC = () => {
  const {
    levels,
    activeChild,
    selectLevel,
    startMasterTest,
    setCurrentScreen,
  } = useGame();

  const { language, setIsLanguageModalOpen, t } = useGlobalLanguage();

  const gradeMeta = getGradeDetails(activeChild.gradeLevel);

  // Group levels into World 1 (Levels 1-5) and World 2 (Levels 6-10)
  const world1Levels = levels.filter((l) => l.id <= 5);
  const world2Levels = levels.filter((l) => l.id > 5 && l.id <= 10);

  const isLevelUnlocked = (levelId: number) => {
    return activeChild.unlockedLevels.includes(levelId) || levelId === 1;
  };

  const isLevelCompleted = (levelId: number) => {
    return activeChild.completedLevels.includes(levelId);
  };

  const getLevelStars = (levelId: number) => {
    const scoreData = activeChild.levelScores[levelId];
    if (!scoreData) return 0;
    if (scoreData.accuracy >= 90) return 3;
    if (scoreData.accuracy >= 80) return 2;
    return 1;
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-20">
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('home_dashboard')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsLanguageModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-full text-xs font-black text-indigo-900 transition-colors cursor-pointer shadow-2xs hover:scale-105"
            title={`Language: ${SUPPORTED_LANGUAGES[language]?.name}`}
          >
            <Globe className="w-3.5 h-3.5 text-indigo-600" />
            <span>{SUPPORTED_LANGUAGES[language]?.nativeName}</span>
          </button>

          <button
            onClick={() => setCurrentScreen('age_select')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-full text-xs font-bold text-blue-800 transition-colors cursor-pointer"
            title="Switch Class (Nursery to 12th)"
          >
            <span>{gradeMeta.icon}</span>
            <span>{gradeMeta.label}</span>
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold text-amber-800">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span className="tabular-nums">{activeChild.stars} Stars</span>
          </div>
        </div>
      </div>

      {/* Map Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md max-h-56 sm:max-h-64">
        <img
          src={ASSET_PATHS.worldMap}
          alt="WonderQuest World Adventure Map"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">
            Interactive Quest Pathway
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            World 1: The Gateway Islands
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mt-1">
            Conquer all 5 progressive levels (25 questions each) to unlock the Milestone Treasure and Master Test Arena!
          </p>
        </div>
      </div>

      {/* World 1 Stepping Stones Pathway */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">
              World 1 Progression (Levels 1 to 5)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Each level contains 25 questions with 60 seconds per question.
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Milestone at Level 5
          </span>
        </div>

        {/* Stepping Stones Grid / Pathway */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {world1Levels.map((lvl, index) => {
            const unlocked = isLevelUnlocked(lvl.id);
            const completed = isLevelCompleted(lvl.id);
            const stars = getLevelStars(lvl.id);
            const isMilestone = lvl.isMilestone;

            return (
              <div
                key={lvl.id}
                onClick={() => unlocked && selectLevel(lvl)}
                className={`relative rounded-3xl p-5 border-2 transition-all flex flex-col justify-between ${
                  !unlocked
                    ? 'border-slate-200 bg-slate-50/60 opacity-60 cursor-not-allowed'
                    : completed
                    ? 'border-emerald-300 bg-emerald-50/30 hover:border-emerald-400 hover:shadow-md cursor-pointer'
                    : 'border-blue-500 bg-blue-50/40 hover:border-blue-600 hover:shadow-md ring-2 ring-blue-500/20 cursor-pointer'
                }`}
              >
                {/* Node Top Header */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-sm font-heading ${
                        completed
                          ? 'bg-emerald-600 text-white'
                          : unlocked
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {lvl.id}
                    </span>

                    {completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : !unlocked ? (
                      <Lock className="w-4 h-4 text-slate-400" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 font-heading line-clamp-2">
                    {lvl.title.replace(`Level ${lvl.id}: `, '')}
                  </h3>

                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {lvl.description}
                  </p>
                </div>

                {/* Stars & Details */}
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= stars
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] font-bold text-amber-700 font-mono">
                    +{lvl.rewardCoins} 🪙
                  </span>
                </div>

                {unlocked && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      selectLevel(lvl);
                    }}
                    className={`w-full mt-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer text-center ${
                      completed
                        ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {completed ? 'Review / Replay' : 'Play (25 Qs)'}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Milestone Chest & Master Test Portal after Level 5 */}
        <div className="mt-8 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md p-2 flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
              <img
                src={ASSET_PATHS.milestoneChest}
                alt="Milestone Chest"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-200 block">
                Milestone 1 Unlock (After Level 5)
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
                Master Test Arena 1 (15 Questions)
              </h3>
              <p className="text-xs text-amber-100 mt-1 max-w-lg">
                Passing requirement: 12/15 (80%). Pass to claim 200 Wonder Coins, 500 XP, and unlock World 2!
              </p>
            </div>
          </div>

          <button
            onClick={() => startMasterTest(5)}
            className="w-full md:w-auto px-6 py-3.5 bg-white hover:bg-amber-50 text-slate-950 font-bold text-xs rounded-2xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2 shrink-0"
          >
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>Enter Master Test Arena</span>
          </button>
        </div>
      </div>

      {/* World 2: The Zenith Odyssey (Levels 6 to 10) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">
              World 2: The Zenith Odyssey (Levels 6 to 10)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Unlocked after mastering World 1 and passing the Master Test!
            </p>
          </div>
          <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Grand Master Test at Level 10
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {world2Levels.map((lvl) => {
            const unlocked = isLevelUnlocked(lvl.id);
            const completed = isLevelCompleted(lvl.id);
            const stars = getLevelStars(lvl.id);

            return (
              <div
                key={lvl.id}
                onClick={() => unlocked && selectLevel(lvl)}
                className={`rounded-3xl p-5 border-2 transition-all flex flex-col justify-between ${
                  !unlocked
                    ? 'border-slate-200 bg-slate-50/70 opacity-60 cursor-not-allowed'
                    : completed
                    ? 'border-purple-300 bg-purple-50/30 hover:border-purple-400 hover:shadow-md cursor-pointer'
                    : 'border-purple-500 bg-purple-50/40 hover:border-purple-600 hover:shadow-md ring-2 ring-purple-500/20 cursor-pointer'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-sm font-heading ${
                        completed
                          ? 'bg-purple-600 text-white'
                          : unlocked
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {lvl.id}
                    </span>

                    {completed ? (
                      <CheckCircle2 className="w-5 h-5 text-purple-600" />
                    ) : !unlocked ? (
                      <Lock className="w-4 h-4 text-slate-400" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-ping" />
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 font-heading line-clamp-2">
                    {lvl.title.replace(`Level ${lvl.id}: `, '')}
                  </h3>

                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {lvl.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= stars ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] font-bold text-amber-700 font-mono">
                    +{lvl.rewardCoins} 🪙
                  </span>
                </div>

                {unlocked && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      selectLevel(lvl);
                    }}
                    className="w-full mt-3 py-1.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white transition-colors cursor-pointer"
                  >
                    Play Level
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
