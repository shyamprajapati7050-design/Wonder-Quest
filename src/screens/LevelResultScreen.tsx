import React, { useEffect, useState, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import confetti from 'canvas-confetti';
import { BADGES } from '../data/shopItems';
import { soundEngine } from '../utils/audio';
import {
  Trophy,
  Star,
  Coins,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  HelpCircle,
  Clock,
  BookOpen,
  Award,
  PartyPopper,
} from 'lucide-react';

export const LevelResultScreen: React.FC = () => {
  const {
    lastAttempt,
    activeLevel,
    retryLevel,
    proceedAfterLevel,
    setCurrentScreen,
    setActiveLessonId,
    activeChild,
  } = useGame();

  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  // Trigger high-intensity confetti celebration for badge or trophy unlocks
  const triggerGrandConfetti = useCallback(() => {
    try {
      // 1. Center cannon blast
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6', '#ffd700'],
      });

      // 2. Left side golden cannon
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#ffd700', '#f59e0b', '#fbbf24', '#ffffff'],
        });
      }, 250);

      // 3. Right side star cannon
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.7 },
          colors: ['#3b82f6', '#60a5fa', '#ffd700', '#ec4899'],
        });
      }, 500);

      // 4. Grand shower for 1.5 seconds
      const end = Date.now() + 1500;
      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ffd700', '#f59e0b', '#3b82f6'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#10b981', '#ec4899', '#8b5cf6'],
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } catch {
      // Graceful fallback if canvas is restricted
    }
  }, []);

  const hasNewBadgeOrTrophy =
    (lastAttempt?.newBadgesEarned && lastAttempt.newBadgesEarned.length > 0) ||
    (lastAttempt?.newTrophiesEarned && lastAttempt.newTrophiesEarned.length > 0) ||
    activeLevel?.isMilestone;

  useEffect(() => {
    if (lastAttempt?.passed) {
      if (hasNewBadgeOrTrophy) {
        // Grand multi-burst confetti for badge/trophy unlock!
        triggerGrandConfetti();
        soundEngine.playFanfare();
      } else {
        // Standard level completion confetti
        try {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3b82f6', '#f59e0b', '#10b981'],
          });
        } catch {}
      }
    }
  }, [lastAttempt, hasNewBadgeOrTrophy, triggerGrandConfetti]);

  if (!lastAttempt || !activeLevel) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">No recent level attempt found.</p>
        <button
          onClick={() => setCurrentScreen('level_map')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
        >
          Return to Map
        </button>
      </div>
    );
  }

  const passed = lastAttempt.passed;
  const starsEarned =
    lastAttempt.accuracy >= 90 ? 3 : lastAttempt.accuracy >= 80 ? 2 : passed ? 1 : 0;

  // Find badge objects corresponding to newly earned badges
  const earnedBadgeDetails = (lastAttempt.newBadgesEarned || [])
    .map((id) => BADGES.find((b) => b.id === id))
    .filter(Boolean);

  return (
    <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn pb-20">
      {/* Newly Earned Badge / Trophy Celebration Banner */}
      {passed && hasNewBadgeOrTrophy && (
        <div className="relative rounded-3xl p-6 sm:p-7 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-2xl border-2 border-amber-300 overflow-hidden animate-pulse-ring">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-3xl shadow-inner animate-gentle-bounce">
                {activeLevel.isMilestone ? '🏆' : '🎖️'}
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-200 block mb-0.5">
                  Achievement Unlocked!
                </span>
                <h2 className="text-xl sm:text-2xl font-black font-heading text-white">
                  {earnedBadgeDetails.length > 0
                    ? `New Badge: ${earnedBadgeDetails[0]?.name}!`
                    : activeLevel.isMilestone
                    ? 'Level 5 Milestone Trophy Claimed!'
                    : 'Explorer Trophy Earned!'}
                </h2>
                <p className="text-xs text-amber-100 mt-1 max-w-md">
                  {earnedBadgeDetails.length > 0
                    ? earnedBadgeDetails[0]?.description
                    : 'Congratulations! You unlocked milestone rewards and the Master Test Arena!'}
                </p>
              </div>
            </div>

            {/* Launch Confetti Again Button */}
            <button
              onClick={triggerGrandConfetti}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-amber-50 text-slate-950 font-extrabold text-xs shadow-md transition-all transform active:scale-95 cursor-pointer flex items-center gap-2 shrink-0"
              title="Launch Confetti Explosion"
            >
              <PartyPopper className="w-4 h-4 text-amber-600" />
              <span>Celebrate Again!</span>
            </button>
          </div>
        </div>
      )}

      {/* Result Card Hero */}
      <div
        className={`rounded-3xl p-6 sm:p-10 text-center border shadow-xs relative overflow-hidden ${
          passed
            ? 'bg-gradient-to-b from-amber-500/10 via-amber-50/40 to-white text-slate-900 border-amber-200/90'
            : 'bg-white text-slate-900 border-slate-200'
        }`}
      >
        <div className="relative z-10 max-w-lg mx-auto">
          {/* Trophy / Stars */}
          <div className="flex items-center justify-center gap-1.5 mb-4">
            {[1, 2, 3].map((s) => (
              <Star
                key={s}
                className={`w-8 h-8 sm:w-10 sm:h-10 transition-transform ${
                  s <= starsEarned
                    ? 'text-amber-500 fill-amber-400 scale-110 drop-shadow-xs'
                    : 'text-slate-300 opacity-40'
                }`}
              />
            ))}
          </div>

          <span
            className={`text-xs font-bold uppercase tracking-widest block mb-1 ${
              passed ? 'text-amber-800' : 'text-slate-500'
            }`}
          >
            Level {activeLevel.id} {passed ? 'Mastered!' : 'Complete - Keep Practicing!'}
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
            {passed ? 'Outstanding Exploration!' : 'Good Effort, Explorer!'}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {passed
              ? `You scored ${lastAttempt.score} out of ${lastAttempt.totalQuestions} questions correctly! Level ${activeLevel.id + 1} has been unlocked.`
              : `You scored ${lastAttempt.score} of ${lastAttempt.totalQuestions} (${lastAttempt.accuracy}%). Review your answers below and try again to score 70%+!`}
          </p>

          {/* Metric Badges Strip */}
          <div
            className={`grid grid-cols-3 gap-3 my-6 p-4 rounded-2xl ${
              passed ? 'bg-amber-50/60 border border-amber-200/60' : 'bg-slate-50 border border-slate-200'
            }`}
          >
            <div>
              <span className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 tabular-nums block">
                {lastAttempt.accuracy}%
              </span>
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                Accuracy
              </span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold font-heading text-amber-700 tabular-nums block">
                +{passed ? activeLevel.rewardCoins : 10} 🪙
              </span>
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                Coins Earned
              </span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold font-heading text-indigo-700 tabular-nums block">
                +{passed ? activeLevel.rewardXp : 25} XP
              </span>
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                Experience
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {passed ? (
              <button
                onClick={proceedAfterLevel}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-bold text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transform active:scale-95 transition-all cursor-pointer"
              >
                <span>Continue Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={retryLevel}
                className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transform active:scale-95 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Level {activeLevel.id}</span>
              </button>
            )}

            <button
              onClick={() => {
                setActiveLessonId(activeLevel.lessonId);
                setCurrentScreen('read_and_learn');
              }}
              className="w-full sm:w-auto px-5 py-3.5 text-xs font-semibold rounded-2xl transition-colors cursor-pointer border bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700"
            >
              Review Lesson
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Review of All 25 Questions */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Complete Question Review (25 Questions)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tap any question to view the detailed explanation and learn the concepts.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-600">
            {lastAttempt.score} / 25 Correct
          </span>
        </div>

        <div className="space-y-3">
          {lastAttempt.userAnswers.map((ans, idx) => {
            const isOpened = expandedQuestionId === ans.questionId;

            return (
              <div
                key={ans.questionId}
                onClick={() => setExpandedQuestionId(isOpened ? null : ans.questionId)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  ans.isCorrect
                    ? 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                    : 'border-rose-200 bg-rose-50/40 hover:bg-rose-50/70'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {ans.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                    <span className="text-xs font-bold text-slate-800 font-heading">
                      Q{idx + 1}. {ans.isCorrect ? 'Correct' : 'Needs Practice'}
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-400 font-mono shrink-0">
                    ⏱ {ans.timeSeconds}s
                  </span>
                </div>

                {isOpened && (
                  <div className="mt-3 pt-3 border-t border-slate-200/80 text-xs space-y-1.5 animate-fadeIn">
                    <p className="text-slate-600">
                      <strong>Your Answer:</strong>{' '}
                      <span className={ans.isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                        {typeof ans.userAnswer === 'object'
                          ? JSON.stringify(ans.userAnswer)
                          : String(ans.userAnswer)}
                      </span>
                    </p>
                    {!ans.isCorrect && (
                      <p className="text-slate-700">
                        <strong>Correct Answer:</strong>{' '}
                        <span className="text-emerald-700 font-bold">
                          {typeof ans.correctAnswer === 'object'
                            ? JSON.stringify(ans.correctAnswer)
                            : String(ans.correctAnswer)}
                        </span>
                      </p>
                    )}
                    <p className="text-slate-700 bg-white p-3 rounded-xl border border-slate-200 mt-2">
                      <strong>Explanation:</strong> {ans.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
