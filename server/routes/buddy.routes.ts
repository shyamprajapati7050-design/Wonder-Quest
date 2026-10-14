import { Router } from 'express';
import { getBuddyHint } from '../controllers/buddy.controller';

const router = Router();

// GET /api/buddies/:buddyId/hint
router.get('/:buddyId/hint', getBuddyHint);

export default router;
