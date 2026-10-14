import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {
  AgeGroup,
  AppLanguage,
  ChapterInfo,
  ChapterQuizScore,
  ChildProfile,
  DailyChallenge,
  DailyStudyPlan,
  DailyGoalItem,
  GradeLevel,
  Level,
  MasterTest,
  MasterTestAttempt,
  ParentSettings,
  Question,
  QuizAttempt,
  RealWorldRewardRequest,
  SubjectId,
  UserRole,
} from '../types';
import { BADGES, SHOP_ITEMS } from '../data/shopItems';
import { getQuestionsForLevel, LEVELS, getMasterTest } from '../data/levelsData';
import { LESSONS } from '../data/lessonsData';
import { getQuestionsForChapter } from '../data/chaptersData';
import { soundEngine } from '../utils/audio';
import { getAgeGroupFromGrade, getGradeFromAge } from '../data/gradesData';
import { auth, firebaseService, StoredUserProfile } from '../services/firebase';
import { getTranslation, TranslationDictionary } from '../data/languages';
import { useGlobalLanguage } from './GlobalLanguageContext';
import { processDailyStreak } from '../data/streakData';
import { calculateDailyStudyPlan, getTodayDateString } from '../data/dailyGoalsData';

export type ScreenView =
  | 'login'
  | 'splash'
  | 'welcome'
  | 'parent_auth'
  | 'child_profile_select'
  | 'age_select'
  | 'home_dashboard'
  | 'chapter_quizzes'
  | 'read_and_learn'
  | 'subjects'
  | 'level_map'
  | 'level_details'
  | 'question_screen'
  | 'level_result'
  | 'rewards'
  | 'achievements'
  | 'master_test'
  | 'master_test_result'
  | 'progress_dashboard'
  | 'parent_dashboard'
  | 'admin_panel'
  | 'settings'
  | 'help_support';

interface GameContextType {
  currentScreen: ScreenView;
  setCurrentScreen: (screen: ScreenView) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  activeChild: ChildProfile;
  allChildren: ChildProfile[];
  switchChild: (childId: string) => void;
  createChildProfile: (
    name: string,
    age: number,
    ageGroup: AgeGroup,
    avatar: string,
    gradeLevel?: GradeLevel
  ) => void;
  setAgeGroup: (group: AgeGroup) => void;
  setGradeLevel: (grade: GradeLevel) => void;

  // Chapter-Wise 25-Question Quizzes
  activeChapter: ChapterInfo | null;
  setActiveChapter: (ch: ChapterInfo | null) => void;
  startChapterQuiz: (chapter: ChapterInfo) => void;
  
  // Levels & Quiz
  levels: Level[];
  activeLevel: Level | null;
  selectLevel: (level: Level) => void;
  startLevelQuiz: (level: Level) => void;
  currentQuestions: Question[];
  currentQuestionIndex: number;
  questionTimeRemaining: number;
  setQuestionTimeRemaining: React.Dispatch<React.SetStateAction<number>>;
  recordAnswer: (answer: any) => void;
  lastAttempt: QuizAttempt | null;
  retryLevel: () => void;
  proceedAfterLevel: () => void;

  // Master Test
  activeMasterTest: MasterTest | null;
  startMasterTest: (milestoneLevel: number) => void;
  lastMasterTestAttempt: MasterTestAttempt | null;
  recordMasterTestAnswer: (answer: any) => void;
  proceedAfterMasterTest: () => void;

  // Lesson
  activeLessonId: string;
  setActiveLessonId: (id: string) => void;

  // Gamification & Shop
  buyShopItem: (itemId: string) => boolean;
  equipAvatar: (avatarIcon: string) => void;
  equipPet: (petIcon: string) => void;
  equipFrame: (frameIcon: string) => void;
  equipAccessory: (accessoryIcon: string | null) => void;
  requestRealReward: (title: string, cost: number, description: string) => boolean;
  approveRealReward: (requestId: string) => void;
  rejectRealReward: (requestId: string) => void;

  // Parent & Admin
  parentSettings: ParentSettings;
  updateParentSettings: (settings: Partial<ParentSettings>) => void;
  verifyParentPin: (pin: string) => boolean;
  showPinModal: boolean;
  setShowPinModal: (show: boolean) => void;
  pinSuccessCallback: (() => void) | null;
  requestParentAction: (callback: () => void) => void;

  // Daily challenges
  dailyChallenges: DailyChallenge[];
  claimDailyChallenge: (challengeId: string) => void;

  // Audio helpers
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  voiceEnabled: boolean;
  setVoiceEnabled: (enabled: boolean) => void;

  // Study Buddy Virtual Mentor
  activeBuddyId: string;
  setActiveBuddyId: (buddyId: string) => void;

  // Admin Level Creation
  addNewLevel: (newLevel: Level, newQuestions: Question[]) => void;

  // Cloud Auth & Firestore Database
  currentUser: StoredUserProfile | null;
  setCurrentUser: (user: StoredUserProfile | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isFirestoreConnected: boolean;

  // 5-Language System (Child can switch anytime)
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  isLanguageModalOpen: boolean;
  setIsLanguageModalOpen: (open: boolean) => void;
  t: TranslationDictionary;

  // Daily Login Streak System
  isStreakModalOpen: boolean;
  setIsStreakModalOpen: (open: boolean) => void;
  checkDailyStreak: () => void;

  // Daily Goals & Personalized Study Plan
  dailyStudyPlan: DailyStudyPlan | null;
  claimDailyGoal: (goalId: string) => void;
  claimDailyStudyPlanBonus: () => void;
  refreshDailyStudyPlan: () => void;
  incrementDailyGoalProgress: (goalId: string, amount?: number) => void;
}

const DEFAULT_CHILDREN: ChildProfile[] = [
  {
    id: 'child_1',
    name: 'Leo Explorer',
    age: 10,
    ageGroup: '9-11',
    gradeLevel: 'class_5',
    avatar: '🦉',
    activeStudyBuddy: 'owl_pip',
    currentLevel: 1,
    currentWorld: 1,
    xp: 450,
    coins: 240,
    stars: 8,
    streakDays: 4,
    lastActiveDate: new Date().toISOString().split('T')[0],
    unlockedLevels: [1, 2, 3],
    completedLevels: [1],
    levelScores: {
      1: { score: 23, accuracy: 92, timeSpentSeconds: 420, passed: true },
    },
    masterTestResults: {
      master_world_1: {
        id: 'attempt_init_1',
        testId: 'master_world_1',
        date: new Date().toISOString().split('T')[0],
        score: 14,
        totalQuestions: 15,
        accuracy: 93,
        grade: 'Outstanding',
        passed: true,
        weakTopics: [],
        userAnswers: [],
      },
    },
    activeAccessory: '🎓',
    earnedBadges: ['first_step', 'streak_3'],
    unlockedItems: ['avatar_astro_owl', 'avatar_spark_bot', 'frame_gold_laurel'],
    activePet: '🐶',
    activeFrame: '🌿',
    weakTopics: [
      { subjectId: 'math', topic: 'Fractions', incorrectCount: 2, needsRevision: true },
      { subjectId: 'science', topic: 'Water Cycle', incorrectCount: 1, needsRevision: false },
    ],
    attempts: [],
    realRewardRequests: [
      {
        id: 'req_1',
        title: 'Trip to Science Planetarium',
        cost: 300,
        description: 'Weekend family outing to the city planetarium exhibit.',
        status: 'pending',
        requestedAt: new Date().toLocaleDateString(),
      },
    ],
  },
  {
    id: 'child_2',
    name: 'Mia Starlight',
    age: 7,
    ageGroup: '6-8',
    gradeLevel: 'class_2',
    avatar: '🐰',
    activeStudyBuddy: 'fox_nova',
    currentLevel: 1,
    currentWorld: 1,
    xp: 220,
    coins: 160,
    stars: 5,
    streakDays: 2,
    lastActiveDate: new Date().toISOString().split('T')[0],
    unlockedLevels: [1],
    completedLevels: [],
    levelScores: {},
    masterTestResults: {},
    earnedBadges: ['first_step'],
    unlockedItems: ['avatar_astro_owl'],
    weakTopics: [],
    attempts: [],
    realRewardRequests: [],
  },
  {
    id: 'child_3',
    name: 'Toby Tiny (Nursery)',
    age: 4,
    ageGroup: '3-5',
    gradeLevel: 'nursery',
    avatar: '🧸',
    activeStudyBuddy: 'bear_barnaby',
    currentLevel: 1,
    currentWorld: 1,
    xp: 180,
    coins: 120,
    stars: 4,
    streakDays: 3,
    lastActiveDate: new Date().toISOString().split('T')[0],
    unlockedLevels: [1],
    completedLevels: [],
    levelScores: {},
    masterTestResults: {},
    earnedBadges: ['first_step'],
    unlockedItems: ['avatar_astro_owl'],
    weakTopics: [],
    attempts: [],
    realRewardRequests: [],
  },
  {
    id: 'child_4',
    name: 'Aria Senior (Class 12)',
    age: 17,
    ageGroup: '17-18',
    gradeLevel: 'class_12',
    avatar: '🎓',
    activeStudyBuddy: 'bot_sparky',
    currentLevel: 1,
    currentWorld: 1,
    xp: 680,
    coins: 380,
    stars: 12,
    streakDays: 6,
    lastActiveDate: new Date().toISOString().split('T')[0],
    unlockedLevels: [1, 2],
    completedLevels: [1],
    levelScores: {
      1: { score: 24, accuracy: 96, timeSpentSeconds: 380, passed: true },
    },
    masterTestResults: {
      master_world_1: {
        id: 'attempt_aria_1',
        testId: 'master_world_1',
        date: new Date().toISOString().split('T')[0],
        score: 15,
        totalQuestions: 15,
        accuracy: 100,
        grade: 'Excellent',
        passed: true,
        weakTopics: [],
        userAnswers: [],
      },
      master_world_2: {
        id: 'attempt_aria_2',
        testId: 'master_world_2',
        date: new Date().toISOString().split('T')[0],
        score: 14,
        totalQuestions: 15,
        accuracy: 93,
        grade: 'Outstanding',
        passed: true,
        weakTopics: [],
        userAnswers: [],
      },
    },
    activeAccessory: '👑',
    earnedBadges: ['first_step', 'speed_demon'],
    unlockedItems: ['avatar_astro_owl', 'frame_gold_laurel'],
    weakTopics: [],
    attempts: [],
    realRewardRequests: [],
  },
];

const DEFAULT_PARENT_SETTINGS: ParentSettings = {
  dailyLimitMinutes: 45,
  soundEnabled: true,
  narrationVoiceEnabled: true,
  difficultyAssist: true,
  parentPin: '1234',
  email: 'guardian@wonderquest.org',
  parentName: 'Sarah Explorer',
  allowRealRewards: true,
};

const DEFAULT_DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: 'daily_1',
    title: 'Solve 10 Questions Today',
    targetCount: 10,
    currentCount: 8,
    rewardCoins: 40,
    rewardXp: 100,
    completed: false,
    icon: 'Target',
  },
  {
    id: 'daily_2',
    title: 'Read 1 Read & Learn Lesson',
    targetCount: 1,
    currentCount: 1,
    rewardCoins: 30,
    rewardXp: 80,
    completed: true,
    icon: 'BookOpen',
  },
  {
    id: 'daily_3',
    title: 'Achieve 80%+ Accuracy on Any Level',
    targetCount: 1,
    currentCount: 1,
    rewardCoins: 50,
    rewardXp: 120,
    completed: true,
    icon: 'Zap',
  },
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Role: Opens directly to Login / Registration Page on app open
  const [currentScreen, setCurrentScreen] = useState<ScreenView>('login');
  const [activeRole, setActiveRole] = useState<UserRole>('child');

  // Profiles
  const [allChildren, setAllChildren] = useState<ChildProfile[]>(() => {
    const saved = localStorage.getItem('wq_children');
    return saved ? JSON.parse(saved) : DEFAULT_CHILDREN;
  });
  const [activeChildId, setActiveChildId] = useState<string>(DEFAULT_CHILDREN[0].id);

  const activeChild =
    allChildren.find((c) => c.id === activeChildId) || allChildren[0] || DEFAULT_CHILDREN[0];

  // Settings
  const [parentSettings, setParentSettings] = useState<ParentSettings>(() => {
    const saved = localStorage.getItem('wq_parent_settings');
    return saved ? JSON.parse(saved) : DEFAULT_PARENT_SETTINGS;
  });

  const [soundEnabled, setSoundEnabledState] = useState<boolean>(true);
  const [voiceEnabled, setVoiceEnabledState] = useState<boolean>(true);

  // Daily Challenges
  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>(DEFAULT_DAILY_CHALLENGES);

  // PIN protection modal
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [pinSuccessCallback, setPinSuccessCallback] = useState<(() => void) | null>(null);

  // Levels & Quiz Session State
  const [levels, setLevels] = useState<Level[]>(LEVELS);
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [activeChapter, setActiveChapter] = useState<ChapterInfo | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questionTimeRemaining, setQuestionTimeRemaining] = useState<number>(60);
  const [currentUserAnswers, setCurrentUserAnswers] = useState<any[]>([]);
  const [lastAttempt, setLastAttempt] = useState<QuizAttempt | null>(null);

  // Master Test Session State
  const [activeMasterTest, setActiveMasterTest] = useState<MasterTest | null>(null);
  const [masterTestAnswers, setMasterTestAnswers] = useState<any[]>([]);
  const [lastMasterTestAttempt, setLastMasterTestAttempt] = useState<MasterTestAttempt | null>(null);

  // Lesson State
  const [activeLessonId, setActiveLessonIdState] = useState<string>('lesson_1');
  const setActiveLessonId = (lessonId: string) => {
    setActiveLessonIdState(lessonId);
    incrementDailyGoalProgress('goal_read_lesson', 1);
  };

  // Cloud Auth & Firestore State
  const [currentUser, setCurrentUser] = useState<StoredUserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isFirestoreConnected, setIsFirestoreConnected] = useState<boolean>(true);

  // Daily Streak Modal State
  const [isStreakModalOpen, setIsStreakModalOpen] = useState<boolean>(false);

  // Global Language Context (5 Languages: English, Hindi, Telugu, Kannada, Malayalam)
  const {
    language,
    setLanguage: setGlobalLanguage,
    isLanguageModalOpen,
    setIsLanguageModalOpen,
    t,
  } = useGlobalLanguage();

  const setLanguage = (newLang: AppLanguage) => {
    setGlobalLanguage(newLang, true);
    updateActiveChild({ language: newLang });
  };

  // Monitor Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const profile = await firebaseService.initializeUserProfile(fbUser);
          if (profile) {
            setCurrentUser(profile);
            setIsFirestoreConnected(true);
          }
        } catch (err) {
          console.warn('Could not initialize user profile on auth state change:', err);
        }
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Listen to Firestore real-time children sync if logged in
  useEffect(() => {
    if (!currentUser) return;
    try {
      const unsub = firebaseService.subscribeChildren(currentUser.id, (childrenDocs) => {
        if (childrenDocs.length > 0) {
          setAllChildren((prev) => {
            const merged = [...prev];
            childrenDocs.forEach((docChild) => {
              const idx = merged.findIndex((c) => c.id === docChild.id);
              const childObj: ChildProfile = {
                ...(idx >= 0 ? merged[idx] : DEFAULT_CHILDREN[0]),
                id: docChild.id,
                name: docChild.name,
                age: docChild.age,
                ageGroup: docChild.ageGroup as any,
                gradeLevel: (docChild.gradeLevel as any) || undefined,
                avatar: docChild.avatar,
                activeStudyBuddy: docChild.activeStudyBuddy,
                currentLevel: docChild.currentLevel,
                currentWorld: docChild.currentWorld,
                xp: docChild.xp,
                coins: docChild.coins,
                stars: docChild.stars,
                streakDays: docChild.streakDays,
              };
              if (idx >= 0) {
                merged[idx] = childObj;
              } else {
                merged.push(childObj);
              }
            });
            return merged;
          });
        }
      });
      return () => unsub();
    } catch (err) {
      console.warn('Real-time listener setup error:', err);
    }
  }, [currentUser]);

  // Sync sounds
  const setSoundEnabled = (val: boolean) => {
    setSoundEnabledState(val);
    soundEngine.enabled = val;
  };

  const setVoiceEnabled = (val: boolean) => {
    setVoiceEnabledState(val);
    soundEngine.speechEnabled = val;
  };

  // LocalStorage autosave
  useEffect(() => {
    localStorage.setItem('wq_children', JSON.stringify(allChildren));
  }, [allChildren]);

  useEffect(() => {
    localStorage.setItem('wq_parent_settings', JSON.stringify(parentSettings));
  }, [parentSettings]);

  // Daily Login Streak evaluation
  const checkDailyStreak = () => {
    if (!activeChild) return;
    const { updatedChild, streakIncremented, awardedCoins, awardedXp } = processDailyStreak(activeChild);
    if (
      streakIncremented ||
      updatedChild.streakDays !== activeChild.streakDays ||
      updatedChild.lastActiveDate !== activeChild.lastActiveDate
    ) {
      updateActiveChild({
        streakDays: updatedChild.streakDays,
        lastActiveDate: updatedChild.lastActiveDate,
        streakHistory: updatedChild.streakHistory,
        coins: updatedChild.coins,
        xp: updatedChild.xp,
        earnedBadges: updatedChild.earnedBadges,
        claimedStreakRewards: updatedChild.claimedStreakRewards,
      });
      if (streakIncremented && awardedCoins > 0) {
        soundEngine.playFanfare();
      }
    }
  };

  // Run streak check on active child mount or profile switch
  useEffect(() => {
    checkDailyStreak();
  }, [activeChildId]);

  // Daily Goals & Personalized Study Plan State
  const [dailyStudyPlans, setDailyStudyPlans] = useState<Record<string, DailyStudyPlan>>(() => {
    try {
      const saved = localStorage.getItem('wq_daily_study_plans');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('wq_daily_study_plans', JSON.stringify(dailyStudyPlans));
    } catch {
      // ignore storage errors
    }
  }, [dailyStudyPlans]);

  const todayDateStr = getTodayDateString();
  const currentPlanKey = activeChild ? `${activeChild.id}_${todayDateStr}` : '';
  const dailyStudyPlan = activeChild
    ? dailyStudyPlans[currentPlanKey] || calculateDailyStudyPlan(activeChild, todayDateStr, null)
    : null;

  // Initialize or re-synchronize plan whenever activeChild or day changes
  useEffect(() => {
    if (!activeChild) return;
    const key = `${activeChild.id}_${todayDateStr}`;
    setDailyStudyPlans((prev) => {
      const existing = prev[key];
      const recalculated = calculateDailyStudyPlan(activeChild, todayDateStr, existing);
      return {
        ...prev,
        [key]: recalculated,
      };
    });
  }, [activeChildId, activeChild?.gradeLevel, activeChild?.currentLevel, activeChild?.weakTopics?.length]);

  const claimDailyGoal = (goalId: string) => {
    if (!activeChild || !dailyStudyPlan) return;
    const targetGoal = dailyStudyPlan.goals.find((g) => g.id === goalId);
    if (!targetGoal || targetGoal.claimed || !targetGoal.completed) return;

    soundEngine.playCorrect();
    updateActiveChild({
      coins: activeChild.coins + targetGoal.rewardCoins,
      xp: activeChild.xp + targetGoal.rewardXp,
    });

    const updatedGoals = dailyStudyPlan.goals.map((g) =>
      g.id === goalId ? { ...g, claimed: true } : g
    );
    const updatedPlan: DailyStudyPlan = {
      ...dailyStudyPlan,
      goals: updatedGoals,
    };

    setDailyStudyPlans((prev) => ({
      ...prev,
      [currentPlanKey]: updatedPlan,
    }));
  };

  const claimDailyStudyPlanBonus = () => {
    if (!activeChild || !dailyStudyPlan || dailyStudyPlan.bonusClaimed || !dailyStudyPlan.allCompleted) return;
    soundEngine.playFanfare();
    updateActiveChild({
      coins: activeChild.coins + dailyStudyPlan.bonusCoins,
      xp: activeChild.xp + dailyStudyPlan.bonusXp,
    });
    setDailyStudyPlans((prev) => ({
      ...prev,
      [currentPlanKey]: {
        ...dailyStudyPlan,
        bonusClaimed: true,
      },
    }));
  };

  const refreshDailyStudyPlan = () => {
    if (!activeChild) return;
    const key = `${activeChild.id}_${todayDateStr}`;
    setDailyStudyPlans((prev) => ({
      ...prev,
      [key]: calculateDailyStudyPlan(activeChild, todayDateStr, prev[key]),
    }));
  };

  const incrementDailyGoalProgress = (goalId: string, amount: number = 1) => {
    if (!activeChild || !dailyStudyPlan) return;
    setDailyStudyPlans((prev) => {
      const plan = prev[currentPlanKey] || dailyStudyPlan;
      if (!plan) return prev;
      const updatedGoals = plan.goals.map((g) => {
        if (g.id !== goalId) return g;
        const newCount = Math.min(g.targetCount, g.currentCount + amount);
        return {
          ...g,
          currentCount: newCount,
          completed: newCount >= g.targetCount,
        };
      });
      const completedCount = updatedGoals.filter((g) => g.completed).length;
      const totalCount = updatedGoals.length;
      const progressPercent = Math.min(100, Math.round((completedCount / totalCount) * 100));
      const allCompleted = completedCount === totalCount;
      return {
        ...prev,
        [currentPlanKey]: {
          ...plan,
          goals: updatedGoals,
          completedCount,
          progressPercent,
          allCompleted,
        },
      };
    });
  };

  // Update active child helper
  const updateActiveChild = (updates: Partial<ChildProfile>) => {
    setAllChildren((prev) =>
      prev.map((c) => (c.id === activeChild.id ? { ...c, ...updates } : c))
    );

    if (currentUser) {
      const merged = { ...activeChild, ...updates };
      firebaseService.syncChildToFirestore(currentUser.id, merged).catch((err) => {
        console.warn('Background child sync failed:', err);
      });
      firebaseService
        .syncUserProgress(currentUser.id, {
          currentLevel: merged.currentLevel,
          currentWorld: merged.currentWorld,
          xp: merged.xp,
          coins: merged.coins,
          stars: merged.stars,
          streakDays: merged.streakDays,
          completedLevels: merged.completedLevels,
          activeStudyBuddy: merged.activeStudyBuddy || 'owl_pip',
          lastPlayedDate: merged.lastActiveDate || new Date().toISOString().split('T')[0],
        })
        .catch((err) => {
          console.warn('Background user progress sync failed:', err);
        });
    }
  };

  // Switch child profile
  const switchChild = (childId: string) => {
    setActiveChildId(childId);
    setCurrentScreen('home_dashboard');
  };

  // Create new child profile
  const createChildProfile = (
    name: string,
    age: number,
    ageGroup: AgeGroup,
    avatar: string,
    gradeLevel?: GradeLevel
  ) => {
    const finalGrade = gradeLevel || getGradeFromAge(age);
    const newChild: ChildProfile = {
      id: `child_${Date.now()}`,
      name,
      age,
      ageGroup,
      gradeLevel: finalGrade,
      avatar,
      activeStudyBuddy: 'owl_pip',
      currentLevel: 1,
      currentWorld: 1,
      xp: 100,
      coins: 50,
      stars: 0,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      unlockedLevels: [1],
      completedLevels: [],
      levelScores: {},
      masterTestResults: {},
      earnedBadges: ['first_step'],
      unlockedItems: ['avatar_astro_owl'],
      weakTopics: [],
      attempts: [],
      realRewardRequests: [],
    };
    setAllChildren((prev) => [...prev, newChild]);
    setActiveChildId(newChild.id);
    setCurrentScreen('home_dashboard');
  };

  // Set Age Group directly
  const setAgeGroup = (group: AgeGroup) => {
    updateActiveChild({ ageGroup: group });
  };

  // Set Grade Level directly (Nursery to 12th class)
  const setGradeLevel = (grade: GradeLevel) => {
    const targetAgeGroup = getAgeGroupFromGrade(grade);
    updateActiveChild({
      gradeLevel: grade,
      ageGroup: targetAgeGroup,
    });
  };

  // Parent PIN verification
  const verifyParentPin = (pin: string): boolean => {
    return pin === parentSettings.parentPin;
  };

  const requestParentAction = (callback: () => void) => {
    setPinSuccessCallback(() => callback);
    setShowPinModal(true);
  };

  const updateParentSettings = (updates: Partial<ParentSettings>) => {
    setParentSettings((prev) => ({ ...prev, ...updates }));
  };

  // Select a level to view details
  const selectLevel = (level: Level) => {
    setActiveLevel(level);
    setActiveLessonId(level.lessonId);
    setCurrentScreen('level_details');
  };

  // Start Level Quiz with EXACTLY 25 Questions
  const startLevelQuiz = (level: Level) => {
    setActiveChapter(null);
    setActiveLevel(level);
    const questions = getQuestionsForLevel(level.id, activeChild.ageGroup);
    setCurrentQuestions(questions); // Exactly 25 questions
    setCurrentQuestionIndex(0);
    setCurrentUserAnswers([]);
    setQuestionTimeRemaining(60); // 60s per question
    setCurrentScreen('question_screen');
  };

  // Start Chapter-Wise 25-Question Quiz for ANY class and subject
  const startChapterQuiz = (chapter: ChapterInfo) => {
    setActiveChapter(chapter);
    setActiveLevel({
      id: chapter.chapterNumber,
      worldSection: 1,
      title: chapter.title,
      description: chapter.description,
      subjectId: chapter.subjectId,
      ageGroup: getAgeGroupFromGrade(chapter.gradeLevel),
      requiredStars: 0,
      rewardXp: 150,
      rewardCoins: 75,
      lessonId: 'lesson_1',
      questionCount: 25,
      passAccuracyThreshold: 70,
    });
    const questions = getQuestionsForChapter(chapter, language);
    setCurrentQuestions(questions); // Exactly 25 questions
    setCurrentQuestionIndex(0);
    setCurrentUserAnswers([]);
    setQuestionTimeRemaining(60); // 60s per question
    setCurrentScreen('question_screen');
  };

  // Record an answer in the 25-question level
  const recordAnswer = (userAnswer: any) => {
    const currentQ = currentQuestions[currentQuestionIndex];
    let isCorrect = false;

    if (currentQ.type === 'drag_drop') {
      isCorrect =
        JSON.stringify(userAnswer) === JSON.stringify(currentQ.correctOrder) ||
        userAnswer === 'ordered_correct';
    } else if (currentQ.type === 'match') {
      isCorrect = userAnswer === 'matched_all' || userAnswer === true;
    } else if (currentQ.type === 'memory') {
      isCorrect = userAnswer === 'all_matched' || userAnswer === true;
    } else {
      isCorrect =
        String(userAnswer).trim().toLowerCase() ===
        String(currentQ.correctAnswer).trim().toLowerCase();
    }

    if (isCorrect) {
      soundEngine.playCorrect();
    } else {
      soundEngine.playIncorrect();
      // Track weak topic
      const existingWeak = activeChild.weakTopics.find(
        (wt) => wt.topic === currentQ.topic && wt.subjectId === currentQ.subjectId
      );
      if (existingWeak) {
        existingWeak.incorrectCount += 1;
        existingWeak.needsRevision = true;
      } else {
        activeChild.weakTopics.push({
          subjectId: currentQ.subjectId,
          topic: currentQ.topic,
          incorrectCount: 1,
          needsRevision: true,
        });
      }
    }

    const answerRecord = {
      questionId: currentQ.id,
      isCorrect,
      userAnswer,
      correctAnswer: currentQ.correctAnswer,
      timeSeconds: 60 - questionTimeRemaining,
      explanation: currentQ.explanation,
    };

    const nextAnswers = [...currentUserAnswers, answerRecord];
    setCurrentUserAnswers(nextAnswers);

    // Track daily goal progress on answer
    incrementDailyGoalProgress('goal_solve_questions', 1);
    if (
      dailyStudyPlan &&
      (currentQ.topic === dailyStudyPlan.weaknessFocusTopic ||
        (dailyStudyPlan.weaknessFocusSubject && currentQ.topic.includes(dailyStudyPlan.weaknessFocusTopic || '')))
    ) {
      incrementDailyGoalProgress('goal_weakness_remedy', 1);
    }

    // If more questions exist in this 25-question set
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setQuestionTimeRemaining(60);
    } else {
      // Completed all 25 questions! Calculate results.
      finalizeLevelResult(nextAnswers);
    }
  };

  const finalizeLevelResult = (answers: any[]) => {
    if (!activeLevel) return;

    const correctCount = answers.filter((a) => a.isCorrect).length;
    const totalQ = answers.length; // 25
    const accuracy = Math.round((correctCount / totalQ) * 100);
    const passed = accuracy >= (activeLevel.passAccuracyThreshold || 70);

    const totalTimeSpent = answers.reduce((acc, a) => acc + (a.timeSeconds || 15), 0);

    // Calculate any newly earned badges or milestone trophies
    const newlyEarnedBadges: string[] = [];
    const newlyEarnedTrophies: string[] = [];

    if (passed) {
      if (correctCount === 25 && !activeChild.earnedBadges.includes('perfect_score')) {
        newlyEarnedBadges.push('perfect_score');
      }
      if (activeLevel.rewardBadgeId && !activeChild.earnedBadges.includes(activeLevel.rewardBadgeId)) {
        newlyEarnedBadges.push(activeLevel.rewardBadgeId);
      }
      if (totalTimeSpent / totalQ <= 20 && !activeChild.earnedBadges.includes('speed_demon')) {
        newlyEarnedBadges.push('speed_demon');
      }
      if (activeLevel.isMilestone) {
        newlyEarnedTrophies.push(`trophy_world_${activeLevel.worldSection}`);
      }
    }

    const attempt: QuizAttempt = {
      id: `attempt_${Date.now()}`,
      levelId: activeLevel.id,
      date: new Date().toISOString(),
      score: correctCount,
      totalQuestions: totalQ,
      accuracy,
      timeSpentSeconds: totalTimeSpent,
      passed,
      newBadgesEarned: newlyEarnedBadges,
      newTrophiesEarned: newlyEarnedTrophies,
      userAnswers: answers,
    };

    setLastAttempt(attempt);

    // If chapter quiz was taken, persist chapter quiz score
    if (activeChapter) {
      const chapterScore: ChapterQuizScore = {
        score: correctCount,
        totalQuestions: totalQ,
        accuracy,
        passed,
        timeSpentSeconds: totalTimeSpent,
        completedAt: new Date().toISOString(),
      };
      const updatedScores = {
        ...(activeChild.chapterQuizScores || {}),
        [activeChapter.id]: chapterScore,
      };
      updateActiveChild({
        chapterQuizScores: updatedScores,
        xp: activeChild.xp + (passed ? 150 : 50),
        coins: activeChild.coins + (passed ? 75 : 20),
        stars: activeChild.stars + (passed ? 3 : 1),
      });
    }

    if (passed) {
      soundEngine.playFanfare();

      // Calculate earned stars (1 to 3)
      let starsEarned = 1;
      if (accuracy >= 90) starsEarned = 3;
      else if (accuracy >= 80) starsEarned = 2;

      // Badges
      const newBadges = Array.from(new Set([...activeChild.earnedBadges, ...newlyEarnedBadges]));

      // Unlock next level
      const nextLevelId = activeLevel.id + 1;
      const updatedUnlocked = Array.from(new Set([...activeChild.unlockedLevels, nextLevelId]));
      const updatedCompleted = Array.from(new Set([...activeChild.completedLevels, activeLevel.id]));

      updateActiveChild({
        xp: activeChild.xp + activeLevel.rewardXp + (accuracy >= 90 ? 50 : 0),
        coins: activeChild.coins + activeLevel.rewardCoins + (accuracy >= 90 ? 25 : 0),
        stars: activeChild.stars + starsEarned,
        unlockedLevels: updatedUnlocked,
        completedLevels: updatedCompleted,
        earnedBadges: newBadges,
        currentLevel: Math.max(activeChild.currentLevel, nextLevelId),
        levelScores: {
          ...activeChild.levelScores,
          [activeLevel.id]: {
            score: correctCount,
            accuracy,
            timeSpentSeconds: totalTimeSpent,
            passed: true,
          },
        },
      });

      if (accuracy >= 80) {
        incrementDailyGoalProgress('goal_accuracy_mastery', 1);
      }
    }

    setCurrentScreen('level_result');
  };

  const retryLevel = () => {
    if (activeChapter) {
      startChapterQuiz(activeChapter);
      return;
    }
    if (activeLevel) {
      startLevelQuiz(activeLevel);
    }
  };

  const proceedAfterLevel = () => {
    if (activeChapter) {
      setCurrentScreen('chapter_quizzes');
      return;
    }
    if (activeLevel?.isMilestone) {
      // Automatic milestone unlock after level 5 or 10!
      startMasterTest(activeLevel.id);
    } else {
      setCurrentScreen('level_map');
    }
  };

  // Start Master Test (15 Questions, 80% passing = 12/15)
  const startMasterTest = (milestoneLevel: number) => {
    const test = getMasterTest(milestoneLevel, activeChild.ageGroup);
    setActiveMasterTest(test);
    setCurrentQuestions(test.questions); // Exactly 15 questions
    setCurrentQuestionIndex(0);
    setMasterTestAnswers([]);
    setQuestionTimeRemaining(60);
    setCurrentScreen('master_test');
  };

  const recordMasterTestAnswer = (userAnswer: any) => {
    if (!activeMasterTest) return;
    const currentQ = currentQuestions[currentQuestionIndex];
    let isCorrect = false;

    if (currentQ.type === 'drag_drop') {
      isCorrect =
        JSON.stringify(userAnswer) === JSON.stringify(currentQ.correctOrder) ||
        userAnswer === 'ordered_correct';
    } else if (currentQ.type === 'match') {
      isCorrect = userAnswer === 'matched_all' || userAnswer === true;
    } else {
      isCorrect =
        String(userAnswer).trim().toLowerCase() ===
        String(currentQ.correctAnswer).trim().toLowerCase();
    }

    if (isCorrect) soundEngine.playCorrect();
    else soundEngine.playIncorrect();

    const answerRecord = {
      questionId: currentQ.id,
      topic: currentQ.topic,
      isCorrect,
    };

    const nextAnswers = [...masterTestAnswers, answerRecord];
    setMasterTestAnswers(nextAnswers);

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setQuestionTimeRemaining(60);
    } else {
      finalizeMasterTestResult(nextAnswers);
    }
  };

  const finalizeMasterTestResult = (answers: any[]) => {
    if (!activeMasterTest) return;

    const correctCount = answers.filter((a) => a.isCorrect).length; // out of 15
    const accuracy = Math.round((correctCount / 15) * 100);
    const passed = correctCount >= 12; // 12/15 = 80% requirement!

    // Grade assignment based on prompt specifications:
    // 15/15 -> Excellent
    // 14/15 -> Outstanding
    // 13/15 -> Great
    // 12/15 -> Passed
    // 11 or below -> Needs Revision
    let grade: 'Excellent' | 'Outstanding' | 'Great' | 'Passed' | 'Needs Revision' =
      'Needs Revision';
    if (correctCount === 15) grade = 'Excellent';
    else if (correctCount === 14) grade = 'Outstanding';
    else if (correctCount === 13) grade = 'Great';
    else if (correctCount === 12) grade = 'Passed';

    const weakTopics = answers
      .filter((a) => !a.isCorrect)
      .map((a) => a.topic);

    const attempt: MasterTestAttempt = {
      id: `mt_attempt_${Date.now()}`,
      testId: activeMasterTest.id,
      date: new Date().toISOString(),
      score: correctCount,
      totalQuestions: 15,
      accuracy,
      grade,
      passed,
      weakTopics: Array.from(new Set(weakTopics)),
      userAnswers: answers,
    };

    setLastMasterTestAttempt(attempt);

    if (passed) {
      soundEngine.playFanfare();
      const updatedBadges = [...activeChild.earnedBadges];
      if (!updatedBadges.includes('master_1')) updatedBadges.push('master_1');
      if (correctCount === 15 && !updatedBadges.includes('master_15')) {
        updatedBadges.push('master_15');
      }

      updateActiveChild({
        xp: activeChild.xp + activeMasterTest.rewardXp,
        coins: activeChild.coins + activeMasterTest.rewardCoins,
        earnedBadges: updatedBadges,
        currentWorld: activeChild.currentWorld + 1,
        masterTestResults: {
          ...activeChild.masterTestResults,
          [activeMasterTest.id]: attempt,
        },
      });
    }

    setCurrentScreen('master_test_result');
  };

  const proceedAfterMasterTest = () => {
    setCurrentScreen('level_map');
  };

  // Gamification & Shop
  const buyShopItem = (itemId: string): boolean => {
    const item = SHOP_ITEMS.find((s) => s.id === itemId);
    if (!item) return false;
    if (activeChild.coins < item.cost) return false;
    if (activeChild.unlockedItems.includes(itemId)) return false;

    updateActiveChild({
      coins: activeChild.coins - item.cost,
      unlockedItems: [...activeChild.unlockedItems, itemId],
    });
    soundEngine.playCorrect();
    return true;
  };

  const equipAvatar = (avatarIcon: string) => {
    updateActiveChild({ avatar: avatarIcon });
    soundEngine.playCardFlip();
  };

  const equipPet = (petIcon: string) => {
    updateActiveChild({ activePet: petIcon });
    soundEngine.playCardFlip();
  };

  const equipFrame = (frameIcon: string) => {
    updateActiveChild({ activeFrame: frameIcon });
    soundEngine.playCardFlip();
  };

  const equipAccessory = (accessoryIcon: string | null) => {
    updateActiveChild({ activeAccessory: accessoryIcon || undefined });
    soundEngine.playCardFlip();
  };

  // Real world reward request from child to parent
  const requestRealReward = (title: string, cost: number, description: string): boolean => {
    if (activeChild.coins < cost) return false;
    const newRequest: RealWorldRewardRequest = {
      id: `req_${Date.now()}`,
      title,
      cost,
      description,
      status: 'pending',
      requestedAt: new Date().toLocaleDateString(),
    };
    updateActiveChild({
      realRewardRequests: [newRequest, ...activeChild.realRewardRequests],
    });
    soundEngine.playCorrect();
    return true;
  };

  const approveRealReward = (requestId: string) => {
    const req = activeChild.realRewardRequests.find((r) => r.id === requestId);
    if (!req) return;
    updateActiveChild({
      coins: Math.max(0, activeChild.coins - req.cost),
      realRewardRequests: activeChild.realRewardRequests.map((r) =>
        r.id === requestId
          ? { ...r, status: 'approved', approvedAt: new Date().toLocaleDateString() }
          : r
      ),
    });
    soundEngine.playFanfare();
  };

  const rejectRealReward = (requestId: string) => {
    updateActiveChild({
      realRewardRequests: activeChild.realRewardRequests.map((r) =>
        r.id === requestId ? { ...r, status: 'rejected' } : r
      ),
    });
  };

  // Daily Challenge claim
  const claimDailyChallenge = (challengeId: string) => {
    const challenge = dailyChallenges.find((c) => c.id === challengeId);
    if (!challenge || challenge.completed) return;

    setDailyChallenges((prev) =>
      prev.map((c) => (c.id === challengeId ? { ...c, completed: true } : c))
    );
    updateActiveChild({
      coins: activeChild.coins + challenge.rewardCoins,
      xp: activeChild.xp + challenge.rewardXp,
    });
    soundEngine.playCorrect();
  };

  // Admin Level Creation
  const addNewLevel = (newLevel: Level, newQuestions: Question[]) => {
    setLevels((prev) => [...prev, newLevel]);
  };

  // Study Buddy Virtual Mentor
  const activeBuddyId = activeChild?.activeStudyBuddy || 'owl_pip';
  const setActiveBuddyId = (buddyId: string) => {
    updateActiveChild({ activeStudyBuddy: buddyId });
  };

  return (
    <GameContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        activeRole,
        setActiveRole,
        activeChild,
        allChildren,
        switchChild,
        createChildProfile,
        setAgeGroup,
        setGradeLevel,
        activeChapter,
        setActiveChapter,
        startChapterQuiz,
        levels,
        activeLevel,
        selectLevel,
        startLevelQuiz,
        currentQuestions,
        currentQuestionIndex,
        questionTimeRemaining,
        setQuestionTimeRemaining,
        recordAnswer,
        lastAttempt,
        retryLevel,
        proceedAfterLevel,
        activeMasterTest,
        startMasterTest,
        lastMasterTestAttempt,
        recordMasterTestAnswer,
        proceedAfterMasterTest,
        activeLessonId,
        setActiveLessonId,
        buyShopItem,
        equipAvatar,
        equipPet,
        equipFrame,
        equipAccessory,
        requestRealReward,
        approveRealReward,
        rejectRealReward,
        parentSettings,
        updateParentSettings,
        verifyParentPin,
        showPinModal,
        setShowPinModal,
        pinSuccessCallback,
        requestParentAction,
        dailyChallenges,
        claimDailyChallenge,
        soundEnabled,
        setSoundEnabled,
        voiceEnabled,
        setVoiceEnabled,
        activeBuddyId,
        setActiveBuddyId,
        addNewLevel,
        currentUser,
        setCurrentUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isFirestoreConnected,
        language,
        setLanguage,
        isLanguageModalOpen,
        setIsLanguageModalOpen,
        t,
        isStreakModalOpen,
        setIsStreakModalOpen,
        checkDailyStreak,
        dailyStudyPlan,
        claimDailyGoal,
        claimDailyStudyPlanBonus,
        refreshDailyStudyPlan,
        incrementDailyGoalProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
