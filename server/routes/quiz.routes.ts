import { Router } from 'express';
import { submitQuiz } from '../controllers/quiz.controller';

const router = Router();

// POST /api/quiz/submit
router.post('/submit', submitQuiz);

export default router;
