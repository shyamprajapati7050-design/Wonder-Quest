import { ChildProfile, DailyGoalItem, DailyStudyPlan, SubjectId, GradeLevel } from '../types';
import { SUBJECTS, getSubjectById } from './subjects';
import { getGradeDetails } from './gradesData';
import { getChapters } from './chaptersData';

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculates a personalized daily study plan for a child based on their:
 * 1. Diagnosed subject weaknesses (from weakTopics, recent incorrect answers)
 * 2. Accuracy history (from levelScores & chapterQuizScores)
 * 3. Class/Grade level and age group
 * 4. Current progress along the world map
 */
export function calculateDailyStudyPlan(
  child: ChildProfile,
  dateString?: string,
  existingPlan?: DailyStudyPlan | null
): DailyStudyPlan {
  const today = dateString || getTodayDateString();
  const gradeLevel: GradeLevel = child.gradeLevel || 'class_5';
  const gradeMeta = getGradeDetails(gradeLevel);

  // 1. Identify primary subject weakness
  // Check weakTopics with needsRevision or highest incorrectCount
  const sortedWeakTopics = [...(child.weakTopics || [])].sort((a, b) => {
    if (a.needsRevision && !b.needsRevision) return -1;
    if (!a.needsRevision && b.needsRevision) return 1;
    return b.incorrectCount - a.incorrectCount;
  });

  const primaryWeakness = sortedWeakTopics[0] || null;
  const weakSubjectId: SubjectId = primaryWeakness?.subjectId || (child.age <= 6 ? 'math' : 'science');
  const weakTopicName: string = primaryWeakness?.topic || (weakSubjectId === 'math' ? 'Fractions & Mental Math' : 'Living Systems & Energy');
  const weakSubData = getSubjectById(weakSubjectId);

  // Find relevant chapter for weak subject and grade
  const subjectChapters = getChapters(gradeLevel, weakSubjectId);
  const relevantChapter = subjectChapters[0] || null;

  // Question target based on age
  const questionTargetCount = child.age <= 5 ? 10 : child.age <= 10 ? 15 : 25;

  // Initialize fresh goal templates
  const freshGoals: DailyGoalItem[] = [
    // Goal 1: Targeted Weakness Remedy (High Priority)
    {
      id: 'goal_weakness_remedy',
      title: primaryWeakness
        ? `Overcome Weakness: ${primaryWeakness.topic}`
        : `Strengthen Core: ${weakSubData.name}`,
      hindiTitle: primaryWeakness
        ? `कमज़ोर विषय सुधार: ${primaryWeakness.topic} (${weakSubData.shortName})`
        : `मूल विषय अभ्यास: ${weakSubData.shortName}`,
      description: primaryWeakness
        ? `Targeted adaptive booster to fix tricky questions in ${primaryWeakness.topic}. Solve practice questions to turn this weakness into a strength!`
        : `Strengthen key ${weakSubData.shortName} fundamentals recommended for ${gradeMeta.label} students.`,
      category: 'weakness',
      categoryLabel: primaryWeakness ? 'Priority Weakness Remedy' : 'Core Focus Booster',
      subjectId: weakSubjectId,
      topic: weakTopicName,
      currentCount: 0,
      targetCount: 1,
      unit: 'drill',
      completed: false,
      claimed: false,
      rewardCoins: 50,
      rewardXp: 100,
      actionLabel: relevantChapter ? 'Practice Chapter →' : 'Start Drill →',
      actionType: relevantChapter ? 'start_chapter' : 'start_level',
      actionSubjectId: weakSubjectId,
      actionChapterId: relevantChapter?.id,
      actionLevelId: child.currentLevel,
      iconName: 'Target',
    },

    // Goal 2: Daily Question Volume Target
    {
      id: 'goal_solve_questions',
      title: `Solve ${questionTargetCount} Questions Today`,
      hindiTitle: `आज ${questionTargetCount} प्रश्नों का अभ्यास करें`,
      description: `Complete interactive questions across any chapter or adventure level to build daily cognitive stamina.`,
      category: 'quantity',
      categoryLabel: 'Daily Practice Target',
      subjectId: undefined,
      currentCount: 0,
      targetCount: questionTargetCount,
      unit: 'questions',
      completed: false,
      claimed: false,
      rewardCoins: 40,
      rewardXp: 80,
      actionLabel: 'Continue Level →',
      actionType: 'start_level',
      actionLevelId: child.currentLevel,
      iconName: 'HelpCircle',
    },

    // Goal 3: Concept Immersion & Reading
    {
      id: 'goal_read_lesson',
      title: primaryWeakness
        ? `Read Concept: ${weakTopicName}`
        : `Complete 1 Read & Learn Lesson`,
      hindiTitle: primaryWeakness
        ? `संकल्पना पाठ: ${weakTopicName}`
        : `पढ़ें और सीखें: 1 अध्याय पढ़ें`,
      description: `Explore illustrated stories, audio pronunciation, and essential keywords in Read & Learn.`,
      category: 'lesson',
      categoryLabel: 'Concept Immersion',
      subjectId: weakSubjectId,
      topic: weakTopicName,
      currentCount: 0,
      targetCount: 1,
      unit: 'lesson',
      completed: false,
      claimed: false,
      rewardCoins: 35,
      rewardXp: 70,
      actionLabel: 'Read Lesson →',
      actionType: 'read_lesson',
      actionLessonId: 'lesson_1',
      iconName: 'BookOpen',
    },

    // Goal 4: Precision & Accuracy Challenge
    {
      id: 'goal_accuracy_mastery',
      title: 'Score ≥80% Accuracy on a Quiz',
      hindiTitle: 'क्विज़ में 80%+ सटीकता प्राप्त करें',
      description: 'Answer carefully without rushing to demonstrate conceptual mastery and earn bonus stars.',
      category: 'accuracy',
      categoryLabel: 'Mastery Challenge',
      currentCount: 0,
      targetCount: 1,
      unit: 'quiz',
      completed: false,
      claimed: false,
      rewardCoins: 50,
      rewardXp: 100,
      actionLabel: 'Start Challenge →',
      actionType: 'start_level',
      actionLevelId: child.currentLevel,
      iconName: 'Zap',
    },
  ];

  // Merge with existing plan if already created for today
  let goals = freshGoals;
  let bonusClaimed = false;

  if (existingPlan && existingPlan.date === today && existingPlan.childId === child.id) {
    bonusClaimed = existingPlan.bonusClaimed;
    goals = freshGoals.map((fresh) => {
      const existing = existingPlan.goals.find((g) => g.id === fresh.id);
      if (existing) {
        return {
          ...fresh,
          currentCount: Math.min(fresh.targetCount, Math.max(existing.currentCount, 0)),
          completed: existing.completed || existing.currentCount >= fresh.targetCount,
          claimed: existing.claimed || false,
        };
      }
      return fresh;
    });
  }

  const completedCount = goals.filter((g) => g.completed).length;
  const totalCount = goals.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalCount) * 100));
  const allCompleted = completedCount === totalCount;

  return {
    date: today,
    childId: child.id,
    goals,
    allCompleted,
    bonusClaimed,
    bonusCoins: 100,
    bonusXp: 200,
    completedCount,
    totalCount,
    progressPercent,
    weaknessFocusSubject: weakSubData.name,
    weaknessFocusTopic: weakTopicName,
  };
}
