import { Request, Response } from 'express';
import { quizService } from '../services/quiz.service';
import { ApiResponse, QuizSubmitResult } from '../types/api.types';

export const submitQuiz = (req: Request, res: Response<ApiResponse<QuizSubmitResult>>) => {
  try {
    const { childId, levelId, answers, timeSpentSeconds } = req.body;

    const result = quizService.evaluateQuiz({
      childId: String(childId),
      levelId: Number(levelId),
      answers: answers || [],
      timeSpentSeconds: Number(timeSpentSeconds || 0),
    });

    res.json({
      success: true,
      data: result,
      message: 'Quiz evaluated successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Error evaluating quiz submission',
    });
  }
};
