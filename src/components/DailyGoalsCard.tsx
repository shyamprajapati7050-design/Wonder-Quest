import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { DailyGoalsProgressRing } from './DailyGoalsProgressRing';
import { soundEngine } from '../utils/audio';
import { getSubjectById } from '../data/subjects';
import { getGradeDetails } from '../data/gradesData';
import {
  Target,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Zap,
  Coins,
  ArrowRight,
  HelpCircle,
  Trophy,
  Check,
  Flame,
  Clock,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { DailyGoalItem } from '../types';

export const DailyGoalsCard: React.FC = () => {
  const {
    activeChild,
    levels,
    dailyStudyPlan,
    claimDailyGoal,
    claimDailyStudyPlanBonus,
    startLevelQuiz,
    startChapterQuiz,
    setActiveLessonId,
    setCurrentScreen,
    t,
  } = useGame();

  const [expandedDetails, setExpandedDetails] = useState(false);

  if (!dailyStudyPlan) return null;

  const currentLevelObj = levels.find((l) => l.id === activeChild.currentLevel) || levels[0];
  const gradeMeta = getGradeDetails(activeChild.gradeLevel);
  const { goals, progressPercent, completedCount, totalCount, allCompleted, bonusClaimed, bonusCoins, bonusXp } = dailyStudyPlan;

  // Handle direct 1-click action for a goal
  const handleGoalAction = (goal: DailyGoalItem) => {
    soundEngine.playCardFlip();

    if (goal.completed && !goal.claimed) {
      claimDailyGoal(goal.id);
      return;
    }

    if (goal.actionType === 'read_lesson') {
      if (goal.actionLessonId) {
        setActiveLessonId(goal.actionLessonId);
      }
      setCurrentScreen('read_and_learn');
    } else if (goal.actionType === 'start_chapter') {
      // Find relevant chapter or default
      setCurrentScreen('chapter_quizzes');
    } else if (goal.actionType === 'start_level' || goal.actionType === 'start_weakness_drill') {
      startLevelQuiz(currentLevelObj);
    }
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'weakness':
        return {
          badge: 'bg-rose-50 text-rose-800 border-rose-200',
          dot: 'bg-rose-500',
          accent: 'border-l-rose-500',
          iconColor: 'text-rose-600',
        };
      case 'quantity':
        return {
          badge: 'bg-indigo-50 text-indigo-800 border-indigo-200',
          dot: 'bg-indigo-500',
          accent: 'border-l-indigo-500',
          iconColor: 'text-indigo-600',
        };
      case 'lesson':
        return {
          badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500',
          accent: 'border-l-emerald-500',
          iconColor: 'text-emerald-600',
        };
      case 'accuracy':
      default:
        return {
          badge: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
          accent: 'border-l-amber-500',
          iconColor: 'text-amber-600',
        };
    }
  };

  const getGoalIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target':
        return <Target className="w-4 h-4" />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4" />;
      case 'Zap':
        return <Zap className="w-4 h-4" />;
      case 'HelpCircle':
      default:
        return <HelpCircle className="w-4 h-4" />;
    }
  };

  return (
    <section
      aria-label="Daily Goals and Personalized Study Plan"
      className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs relative overflow-hidden"
    >
      {/* Subtle warm ambient highlight */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-100/30 via-emerald-50/20 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Main Header Row */}
      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.dailyGoals || 'Daily Goals & Study Plan'}</span>
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
              {gradeMeta.label} Adaptive Plan
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Resets at Midnight</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading tracking-tight">
            Personalized Daily Study Targets
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
            {t.dailyGoalsSub ||
              'Calculated from your current progress, level accuracy, and diagnosed subject weaknesses.'}
          </p>
        </div>

        {/* Quick Streak & Bonus Pill */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-orange-50 border border-orange-200 text-xs font-bold text-orange-900">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-400" />
            <span>{activeChild.streakDays}d Streak Active</span>
          </div>

          {allCompleted && !bonusClaimed && (
            <button
              onClick={() => {
                claimDailyStudyPlanBonus();
              }}
              className="px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-extrabold text-xs shadow-sm flex items-center gap-1.5 animate-pulse cursor-pointer transition-all active:scale-95"
            >
              <Trophy className="w-4 h-4 fill-amber-500" />
              <span>Claim +{bonusCoins} Bonus!</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress Ring Hero Row + Weakness Spotlight Banner */}
      <div className="py-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Progress Ring Column (4 cols on lg) */}
        <div className="lg:col-span-4 flex items-center gap-4 sm:gap-5 bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
          <div className="shrink-0">
            <DailyGoalsProgressRing
              progressPercent={progressPercent}
              completedCount={completedCount}
              totalCount={totalCount}
              size={96}
              strokeWidth={8}
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-slate-900 font-heading">
                {t.dailyGoalsProgress || "Day's Targets"}
              </span>
              {allCompleted && (
                <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                  100%
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 mt-0.5 leading-snug">
              {allCompleted
                ? 'All goals achieved! Outstanding focus today!'
                : `${totalCount - completedCount} target${totalCount - completedCount > 1 ? 's' : ''} remaining for bonus coins.`}
            </p>

            <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
              <span className="flex items-center gap-1 text-amber-700">
                <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>+{goals.reduce((acc, g) => acc + g.rewardCoins, 0) + bonusCoins} Total Coins</span>
              </span>
            </div>
          </div>
        </div>

        {/* Adaptive Weakness Recommendation Callout (8 cols on lg) */}
        <div className="lg:col-span-8 bg-gradient-to-r from-amber-50/70 via-white to-indigo-50/50 rounded-2xl p-4 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
              <Target className="w-5 h-5 text-amber-600" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md">
                  Adaptive Focus
                </span>
                <span className="text-xs font-extrabold text-slate-900">
                  {dailyStudyPlan.weaknessFocusTopic || 'Core Concept Reinforcement'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Prioritized practice in <strong>{dailyStudyPlan.weaknessFocusSubject || 'Core Curriculum'}</strong> based on recent questions to turn this weakness into a high-scoring mastery!
              </p>
            </div>
          </div>

          <button
            onClick={() => handleGoalAction(goals[0])}
            className="shrink-0 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
          >
            <span>Start Focus Drill</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Interactive Goals Target List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
        {goals.map((goal, index) => {
          const theme = getCategoryTheme(goal.category);
          const isComplete = goal.completed;
          const isClaimed = goal.claimed;
          const subjectData = goal.subjectId ? getSubjectById(goal.subjectId) : null;
          const progressRatio = Math.min(100, Math.round((goal.currentCount / goal.targetCount) * 100));

          return (
            <div
              key={goal.id}
              className={`rounded-2xl border transition-all p-4 flex flex-col justify-between gap-3 ${
                isComplete
                  ? 'bg-emerald-50/30 border-emerald-200/80 shadow-2xs'
                  : 'bg-slate-50/60 hover:bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              {/* Top Meta Line: Category Badge + Subject + Rewards */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${theme.badge}`}>
                    {goal.categoryLabel}
                  </span>
                  {subjectData && (
                    <span className="text-[10px] font-bold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                      {subjectData.shortName}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700">
                  <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  <span className="font-mono tabular-nums">+{goal.rewardCoins}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-[11px] text-indigo-700 font-mono">+{goal.rewardXp} XP</span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                  <span className={`shrink-0 ${theme.iconColor}`}>{getGoalIcon(goal.iconName)}</span>
                  <span>{goal.title}</span>
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {goal.description}
                </p>
              </div>

              {/* Progress Bar + Numbers */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-[11px] text-slate-500">Progress</span>
                  <span className="text-[11px] font-mono tabular-nums text-slate-700 font-bold">
                    {goal.currentCount} / {goal.targetCount} {goal.unit} ({progressRatio}%)
                  </span>
                </div>

                <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isComplete
                        ? 'bg-emerald-500'
                        : 'bg-gradient-to-r from-amber-400 to-indigo-500'
                    }`}
                    style={{ width: `${progressRatio}%` }}
                  />
                </div>
              </div>

              {/* Action Button Row */}
              <div className="pt-1 flex items-center justify-between gap-2 border-t border-slate-100">
                <div className="text-[11px]">
                  {isClaimed ? (
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Claimed
                    </span>
                  ) : isComplete ? (
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                      <Check className="w-3.5 h-3.5" /> Completed!
                    </span>
                  ) : (
                    <span className="text-slate-400 font-medium">In Progress</span>
                  )}
                </div>

                {isComplete && !isClaimed ? (
                  <button
                    onClick={() => {
                      claimDailyGoal(goal.id);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                  >
                    <Coins className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Claim +{goal.rewardCoins} Coins</span>
                  </button>
                ) : isClaimed ? (
                  <button
                    onClick={() => handleGoalAction(goal)}
                    className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Practice Again
                  </button>
                ) : (
                  <button
                    onClick={() => handleGoalAction(goal)}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                  >
                    <span>{goal.actionLabel}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Bonus Celebration Banner (when 4 of 4 completed) */}
      {allCompleted && (
        <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-indigo-500/10 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-sm shrink-0">
              🎉
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-extrabold text-slate-900 font-heading">
                {t.dailyGoalsCompleted || 'All Daily Goals Completed!'}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                You conquered every target in your personalized plan today. Outstanding commitment to learning!
              </p>
            </div>
          </div>

          {!bonusClaimed ? (
            <button
              onClick={() => {
                claimDailyStudyPlanBonus();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20 flex items-center gap-2 cursor-pointer transition-all active:scale-95 shrink-0"
            >
              <Trophy className="w-4 h-4 fill-amber-500" />
              <span>Claim +{bonusCoins} Coins & +{bonusXp} XP</span>
            </button>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-xl border border-emerald-300 shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Full Study Plan Bonus Claimed!</span>
            </span>
          )}
        </div>
      )}
    </section>
  );
};
