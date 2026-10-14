import React, { useEffect, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import confetti from 'canvas-confetti';
import { ASSET_PATHS } from '../assets/assetRegistry';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  BookOpen,
  Sparkles,
  Award,
  AlertCircle,
  PartyPopper,
} from 'lucide-react';

export const MasterTestResultScreen: React.FC = () => {
  const {
    lastMasterTestAttempt,
    activeMasterTest,
    startMasterTest,
    proceedAfterMasterTest,
    setCurrentScreen,
    setActiveLessonId,
  } = useGame();

  const triggerGrandConfetti = useCallback(() => {
    try {
      // 1. Center burst
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#ffd700', '#f59e0b', '#10b981', '#3b82f6', '#ec4899'],
      });

      // 2. Left side golden cannon
      setTimeout(() => {
        confetti({
          particleCount: 70,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#ffd700', '#f59e0b', '#fbbf24', '#ffffff'],
        });
      }, 250);

      // 3. Right side diamond cannon
      setTimeout(() => {
        confetti({
          particleCount: 70,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.7 },
          colors: ['#3b82f6', '#60a5fa', '#ffd700', '#ec4899'],
        });
      }, 500);
    } catch {}
  }, []);

  useEffect(() => {
    if (lastMasterTestAttempt?.passed) {
      triggerGrandConfetti();
    }
  }, [lastMasterTestAttempt, triggerGrandConfetti]);

  if (!lastMasterTestAttempt || !activeMasterTest) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">No recent Master Test attempt found.</p>
        <button
          onClick={() => setCurrentScreen('level_map')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
        >
          Return to Map
        </button>
      </div>
    );
  }

  const passed = lastMasterTestAttempt.passed;
  const grade = lastMasterTestAttempt.grade; // Excellent, Outstanding, Great, Passed, Needs Revision

  return (
    <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn pb-20">
      {/* Result Card Hero */}
      <div
        className={`rounded-3xl p-6 sm:p-10 text-center border shadow-2xl relative overflow-hidden ${
          passed
            ? 'bg-gradient-to-b from-amber-600 via-orange-600 to-slate-950 text-white border-amber-500'
            : 'bg-white text-slate-900 border-slate-200'
        }`}
      >
        <div className="relative z-10 max-w-lg mx-auto">
          {/* Trophy Graphic */}
          <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mx-auto mb-4 p-2 shadow-lg">
            <img
              src={ASSET_PATHS.milestoneChest}
              alt="Milestone Trophy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          <span
            className={`text-xs font-extrabold uppercase tracking-widest block mb-1 ${
              passed ? 'text-amber-200' : 'text-slate-400'
            }`}
          >
            Level {activeMasterTest.milestoneLevel} Milestone Arena
          </span>

          <h1
            className={`text-3xl sm:text-4xl font-extrabold font-heading ${
              passed ? 'text-white' : 'text-slate-900'
            }`}
          >
            Master Test Result: {grade}
          </h1>

          <p
            className={`mt-2 text-xs sm:text-sm leading-relaxed ${
              passed ? 'text-amber-100' : 'text-slate-600'
            }`}
          >
            {passed
              ? `Congratulations! You scored ${lastMasterTestAttempt.score} of 15 questions correctly (80%+). Next learning section and Realm 2 are now unlocked!`
              : `You scored ${lastMasterTestAttempt.score} of 15 questions (${lastMasterTestAttempt.accuracy}%). A minimum of 12/15 (80%) is required to pass.`}
          </p>

          {/* Metric Summary */}
          <div
            className={`grid grid-cols-3 gap-3 my-6 p-4 rounded-2xl ${
              passed ? 'bg-white/10 border border-white/20' : 'bg-slate-50 border border-slate-200'
            }`}
          >
            <div>
              <span className="text-xl sm:text-2xl font-extrabold font-heading tabular-nums block">
                {lastMasterTestAttempt.score} / 15
              </span>
              <span className="text-[11px] text-slate-300 uppercase tracking-wider">
                Score
              </span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold font-heading text-amber-300 tabular-nums block">
                +{passed ? activeMasterTest.rewardCoins : 20} 🪙
              </span>
              <span className="text-[11px] text-slate-300 uppercase tracking-wider">
                Wonder Coins
              </span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold font-heading text-blue-300 tabular-nums block">
                +{passed ? activeMasterTest.rewardXp : 50} XP
              </span>
              <span className="text-[11px] text-slate-300 uppercase tracking-wider">
                Knowledge XP
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {passed ? (
              <>
                <button
                  onClick={proceedAfterMasterTest}
                  className="w-full sm:w-auto px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition-all cursor-pointer"
                >
                  <span>Unlock Next Realm</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={triggerGrandConfetti}
                  className="w-full sm:w-auto px-5 py-3.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-2xl border border-white/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <PartyPopper className="w-4 h-4 text-amber-300" />
                  <span>Celebrate Again!</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => startMasterTest(activeMasterTest.milestoneLevel)}
                className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Master Test (15 Qs)</span>
              </button>
            )}

            <button
              onClick={() => setCurrentScreen('level_map')}
              className={`w-full sm:w-auto px-5 py-3.5 text-xs font-semibold rounded-2xl transition-colors cursor-pointer border ${
                passed
                  ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
              }`}
            >
              Return to Map
            </button>
          </div>
        </div>
      </div>

      {/* Weak Topics Analysis & Targeted Revision */}
      {lastMasterTestAttempt.weakTopics.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 text-rose-600 mb-2">
            <AlertCircle className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Diagnosed Topics for Revision
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 mb-5">
            Based on your test questions, we recommend practicing these specific subjects to achieve mastery:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {lastMasterTestAttempt.weakTopics.map((topic, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 flex items-center justify-between"
              >
                <span className="text-xs font-bold text-rose-950">{topic}</span>
                <span className="text-[10px] text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md font-semibold">
                  Recommended Revision
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setActiveLessonId('lesson_1');
              setCurrentScreen('read_and_learn');
            }}
            className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Open Recommended Revision Lessons</span>
          </button>
        </div>
      )}
    </div>
  );
};
