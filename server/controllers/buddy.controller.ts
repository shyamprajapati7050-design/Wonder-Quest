import { Request, Response } from 'express';
import { buddyService } from '../services/buddy.service';
import { ApiResponse, BuddyHintResponse } from '../types/api.types';

export const getBuddyHint = (req: Request, res: Response<ApiResponse<BuddyHintResponse>>) => {
  try {
    const { buddyId } = req.params;
    const { lessonId, sectionIndex, childName } = req.query;

    const result = buddyService.getHint({
      buddyId: buddyId || 'owl_pip',
      lessonId: String(lessonId || 'lesson_1'),
      sectionIndex: Number(sectionIndex || 0),
      childName: childName ? String(childName) : undefined,
    });

    res.json({
      success: true,
      data: result,
      message: 'Study Buddy hint retrieved successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error while fetching hint',
    });
  }
};
