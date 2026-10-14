export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface BuddyHintRequest {
  buddyId: string;
  lessonId: string;
  sectionIndex: number;
  childName?: string;
}

export interface BuddyHintResponse {
  buddyId: string;
  buddyName: string;
  hint: string;
  speechText: string;
  voiceConfig: {
    pitch: number;
    rate: number;
  };
}

export interface QuizSubmitRequest {
  childId: string;
  levelId: number;
  answers: {
    questionId: string;
    userAnswer: any;
    isCorrect: boolean;
  }[];
  timeSpentSeconds: number;
}

export interface QuizSubmitResult {
  levelId: number;
  score: number;
  totalQuestions: number;
  accuracy: number;
  passed: boolean;
  rewardCoins: number;
  rewardXp: number;
  newBadgesEarned: string[];
}
