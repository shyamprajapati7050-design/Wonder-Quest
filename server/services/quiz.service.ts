import { QuizSubmitRequest, QuizSubmitResult } from '../types/api.types';

export class QuizService {
  evaluateQuiz(req: QuizSubmitRequest): QuizSubmitResult {
    const totalQuestions = req.answers.length || 25;
    const correctCount = req.answers.filter((a) => a.isCorrect).length;
    const accuracy = Math.round((correctCount / totalQuestions) * 100);
    const passed = accuracy >= 70;

    const rewardCoins = passed ? 50 + Math.floor(accuracy / 10) * 5 : 10;
    const rewardXp = passed ? 100 + Math.floor(accuracy / 10) * 10 : 25;

    const newBadges: string[] = [];
    if (passed && accuracy === 100) {
      newBadges.push('perfectionist');
    }
    if (passed && req.timeSpentSeconds < 300) {
      newBadges.push('speed_demon');
    }

    return {
      levelId: req.levelId,
      score: correctCount,
      totalQuestions,
      accuracy,
      passed,
      rewardCoins,
      rewardXp,
      newBadgesEarned: newBadges,
    };
  }
}

export const quizService = new QuizService();
