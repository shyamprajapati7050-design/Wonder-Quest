import React from 'react';
import { useGame } from '../context/GameContext';
import {
  X,
  Play,
  BookOpen,
  Timer,
  CheckCircle2,
  Award,
  Sparkles,
  Coins,
  ArrowRight,
} from 'lucide-react';

export const LevelDetailsModal: React.FC = () => {
  const {
    activeLevel,
    setCurrentScreen,
    startLevelQuiz,
    setActiveLessonId,
    activeChild,
  } = useGame();

  if (!activeLevel) return null;

  const scoreData = activeChild.levelScores[activeLevel.id];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
        <button
          onClick={() => setCurrentScreen('level_map')}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Level Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Level {activeLevel.id} Dossier
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs font-semibold text-slate-500">
            Age {activeChild.ageGroup} Adapted
          </span>
        </div>

        <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
          {activeLevel.title}
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          {activeLevel.description}
        </p>

        {/* Level Structure Highlights */}
        <div className="grid grid-cols-2 gap-3 my-6">
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-blue-950 block">Exactly 25 Questions</span>
              <span className="text-[11px] text-blue-700">MCQ, Match, Drag, Memory</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-950 block">60 Seconds / Question</span>
              <span className="text-[11px] text-amber-800">1 minute maximum per Q</span>
            </div>
          </div>
        </div>

        {/* Rewards Breakdown */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Level Mastery Bounties
          </span>
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800">
            <span className="flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>+{activeLevel.rewardCoins} Wonder Coins</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>+{activeLevel.rewardXp} XP</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-500" />
              <span>Pass: ≥70% Score</span>
            </span>
          </div>
        </div>

        {/* Previous Score if Replaying */}
        {scoreData && (
          <div className="text-xs text-slate-500 bg-emerald-50 border border-emerald-200 p-3 rounded-xl mb-6 flex items-center justify-between">
            <span className="text-emerald-800 font-semibold">Your Previous High Score:</span>
            <span className="font-bold text-emerald-950 tabular-nums">
              {scoreData.score}/25 Correct ({scoreData.accuracy}%)
            </span>
          </div>
        )}

        {/* Two Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => {
              setActiveLessonId(activeLevel.lessonId);
              setCurrentScreen('read_and_learn');
            }}
            className="py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Read & Learn First</span>
          </button>

          <button
            onClick={() => startLevelQuiz(activeLevel)}
            className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 text-xs font-bold transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Start 25 Questions Quiz</span>
          </button>
        </div>
      </div>
    </div>
  );
};
