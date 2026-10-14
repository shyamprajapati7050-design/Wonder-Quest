export type AgeGroup = '3-5' | '6-8' | '9-11' | '12-14' | '15-16' | '17-18';

// Supported 5 Languages (Child can switch anytime)
export type AppLanguage = 'en' | 'hi' | 'te' | 'kn' | 'ml';

export interface LanguageOption {
  code: AppLanguage;
  name: string;
  nativeName: string;
  flag: string;
  scriptLabel: string;
  greeting: string;
  voiceLangCode: string;
}

export type GradeLevel =
  | 'nursery'
  | 'lkg_ukg'
  | 'class_1'
  | 'class_2'
  | 'class_3'
  | 'class_4'
  | 'class_5'
  | 'class_6'
  | 'class_7'
  | 'class_8'
  | 'class_9'
  | 'class_10'
  | 'class_11'
  | 'class_12';

export interface GradeMetadata {
  id: GradeLevel;
  label: string;
  shortLabel: string;
  stage: 'pre_primary' | 'primary' | 'middle' | 'secondary' | 'senior_secondary';
  stageName: string;
  ageRange: string;
  ageGroup: AgeGroup;
  icon: string;
  color: string;
  description: string;
  sampleTopics: string[];
}

export type UserRole = 'child' | 'parent' | 'student' | 'teacher' | 'admin';

export type SubjectId =
  | 'hindi'
  | 'social_science'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'english'
  | 'geography'
  | 'history'
  | 'economy'
  | 'mahabharat'
  | 'home_science'
  | 'science'
  | 'computer'
  | 'sanskrit'
  | 'math'
  | 'gk'
  | 'logic'
  | 'reading'
  | 'puzzles';

export type QuestionType =
  | 'mcq'
  | 'true_false'
  | 'match'
  | 'image'
  | 'drag_drop'
  | 'memory'
  | 'problem_solving';

export interface MatchPair {
  id: string;
  left: string;
  right: string;
}

export interface MemoryCard {
  id: string;
  label: string;
  icon?: string;
  matchId: string;
}

export interface Question {
  id: string;
  levelId: number;
  questionNumber: number; // 1 to 25
  type: QuestionType;
  prompt: string;
  subjectId: SubjectId;
  topic: string;
  ageGroup: AgeGroup;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  explanation: string;
  hints?: string[];
  imageUrl?: string;
  // For MCQ / True-False / Image
  options?: string[];
  correctAnswer: string | number | boolean;
  // For Match the following
  matchPairs?: MatchPair[];
  // For Drag and drop / ordering
  dragItems?: string[];
  correctOrder?: string[];
  // For Memory games
  memoryCards?: MemoryCard[];
}

export interface Level {
  id: number; // 1, 2, 3, 4, 5...
  worldSection: number; // 1 for levels 1-5, 2 for levels 6-10, etc.
  title: string;
  description: string;
  subjectId: SubjectId;
  ageGroup: AgeGroup;
  requiredStars: number;
  rewardXp: number;
  rewardCoins: number;
  rewardBadgeId?: string;
  isMilestone?: boolean;
  lessonId: string;
  questionCount: number; // Exactly 25
  passAccuracyThreshold: number; // e.g. 70%
}

export interface MasterTest {
  id: string;
  milestoneLevel: number; // 5, 10, 15
  title: string;
  description: string;
  ageGroup: AgeGroup;
  questionCount: number; // Exactly 15
  passingScore: number; // Exactly 12 (80%)
  rewardTrophyId: string;
  rewardBadgeName: string;
  rewardCoins: number;
  rewardXp: number;
  questions: Question[];
}

export interface ChapterInfo {
  id: string; // e.g. 'class_10_math_ch1'
  chapterNumber: number;
  gradeLevel: GradeLevel;
  subjectId: SubjectId;
  title: string;
  hindiTitle?: string;
  ncertBookName?: string; // e.g. 'NCERT Math-Magic', 'NCERT रिमझिम', 'NCERT Beehive'
  description: string;
  keyConcepts: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number; // Exactly 25
  icon?: string;
  tags?: string[];
}

export interface ChapterQuizScore {
  score: number;
  totalQuestions: number; // 25
  accuracy: number;
  passed: boolean;
  timeSpentSeconds: number;
  completedAt: string;
}

export interface LessonSection {
  heading: string;
  content: string;
  speechText?: string;
  illustrationType?: 'diagram' | 'experiment' | 'formula' | 'story';
}

export interface KeyWord {
  word: string;
  pronunciation?: string;
  meaning: string;
  example: string;
}

export interface MiniActivity {
  type: 'quick_check' | 'flip_cards' | 'sorting';
  title: string;
  prompt: string;
  options?: string[];
  correctOption?: string;
  feedback: string;
}

export interface Lesson {
  id: string;
  levelId: number;
  title: string;
  subjectId: SubjectId;
  ageGroup: AgeGroup;
  estimatedMinutes: number;
  summary: string;
  sections: LessonSection[];
  keyWords: KeyWord[];
  miniActivity: MiniActivity;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'mastery' | 'streak' | 'speed' | 'milestone' | 'special';
  rarity: 'bronze' | 'silver' | 'gold' | 'diamond';
}

export interface ShopItem {
  id: string;
  name: string;
  type: 'avatar' | 'pet' | 'frame' | 'theme';
  cost: number;
  icon: string;
  description: string;
  unlockedByDefault?: boolean;
}

export interface RealWorldRewardRequest {
  id: string;
  title: string;
  cost: number;
  description: string;
  status: 'pending' | 'approved' | 'claimed' | 'rejected';
  requestedAt: string;
  approvedAt?: string;
}

export interface QuizAttempt {
  id: string;
  levelId: number;
  date: string;
  score: number;
  totalQuestions: number; // 25
  accuracy: number;
  timeSpentSeconds: number;
  passed: boolean;
  newBadgesEarned?: string[];
  newTrophiesEarned?: string[];
  userAnswers: {
    questionId: string;
    isCorrect: boolean;
    userAnswer: any;
    correctAnswer: any;
    timeSeconds: number;
    explanation: string;
  }[];
}

export interface MasterTestAttempt {
  id: string;
  testId: string;
  date: string;
  score: number;
  totalQuestions: number; // 15
  accuracy: number;
  grade: 'Excellent' | 'Outstanding' | 'Great' | 'Passed' | 'Needs Revision';
  passed: boolean;
  weakTopics: string[];
  userAnswers: {
    questionId: string;
    topic: string;
    isCorrect: boolean;
  }[];
}

export type BuddyAnimationState = 'waving' | 'celebrating' | 'speaking' | 'idle' | 'thinking';

export interface StudyBuddyVoiceConfig {
  pitch: number;
  rate: number;
}

export interface StudyBuddy {
  id: string;
  name: string;
  species: string;
  title: string;
  personality: string;
  catchphrase: string;
  avatarEmoji: string;
  colorTheme: {
    primary: string;
    light: string;
    border: string;
    badge: string;
    glow: string;
  };
  strengths: string[];
  voiceConfig: StudyBuddyVoiceConfig;
  dialogue: {
    greeting: string;
    progressEncouragement: string;
    celebration: string;
    hintLead: string;
    nextStepCue: string;
  };
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  ageGroup: AgeGroup;
  gradeLevel?: GradeLevel;
  avatar: string;
  language?: AppLanguage;
  phoneNumber?: string;
  activeStudyBuddy?: string;
  currentLevel: number;
  currentWorld: number;
  xp: number;
  coins: number;
  stars: number;
  streakDays: number;
  lastActiveDate: string;
  streakHistory?: string[];
  claimedStreakRewards?: number[];
  unlockedLevels: number[];
  completedLevels: number[];
  levelScores: Record<number, { score: number; accuracy: number; timeSpentSeconds: number; passed: boolean }>;
  masterTestResults: Record<string, MasterTestAttempt>;
  earnedBadges: string[];
  unlockedItems: string[];
  activePet?: string;
  activeFrame?: string;
  activeAccessory?: string;
  weakTopics: { subjectId: SubjectId; topic: string; incorrectCount: number; needsRevision: boolean }[];
  attempts: QuizAttempt[];
  realRewardRequests: RealWorldRewardRequest[];
  chapterQuizScores?: Record<string, ChapterQuizScore>;
}

export interface ParentSettings {
  dailyLimitMinutes: number;
  soundEnabled: boolean;
  narrationVoiceEnabled: boolean;
  difficultyAssist: boolean;
  parentPin: string; // 4-digit code
  email: string;
  parentName: string;
  phoneNumber?: string;
  allowRealRewards: boolean;
}

export interface DailyChallenge {
  id: string;
  title: string;
  targetCount: number;
  currentCount: number;
  rewardCoins: number;
  rewardXp: number;
  completed: boolean;
  icon: string;
}

export type GoalCategory = 'weakness' | 'quantity' | 'lesson' | 'accuracy';

export interface DailyGoalItem {
  id: string;
  title: string;
  hindiTitle?: string;
  description: string;
  category: GoalCategory;
  categoryLabel: string;
  subjectId?: SubjectId;
  topic?: string;
  currentCount: number;
  targetCount: number;
  unit: string;
  completed: boolean;
  claimed?: boolean;
  rewardCoins: number;
  rewardXp: number;
  actionLabel: string;
  actionType: 'start_chapter' | 'start_level' | 'read_lesson' | 'start_weakness_drill';
  actionSubjectId?: SubjectId;
  actionLevelId?: number;
  actionChapterId?: string;
  actionLessonId?: string;
  iconName: string;
}

export interface DailyStudyPlan {
  date: string;
  childId: string;
  goals: DailyGoalItem[];
  allCompleted: boolean;
  bonusClaimed: boolean;
  bonusCoins: number;
  bonusXp: number;
  completedCount: number;
  totalCount: number;
  progressPercent: number;
  weaknessFocusSubject?: string;
  weaknessFocusTopic?: string;
}

export interface SubjectBookFeedback {
  id: string;
  childId: string;
  childName: string;
  subjectId: SubjectId;
  subjectName: string;
  gradeLevel: GradeLevel;
  rating: number;
  reviewText?: string;
  favoriteTopic?: string;
  completedAt: string;
  accuracy: number;
}

export interface MasterTestRewardTier {
  id: string;
  tierNumber: number;
  tierTitle: string;
  requiredMasterTests: number;
  accessoryName: string;
  accessoryIcon: string;
  accessorySlot: 'head' | 'aura' | 'wings' | 'held' | 'halo';
  description: string;
  lore: string;
  bonusTitle: string;
  coinBonus: number;
  xpBonus: number;
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'legendary';
  gradient: string;
  badgeColor: string;
}
