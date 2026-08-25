import { Router } from 'express';
import { authenticate } from '../../middleware/auth.middleware.js';
import { validateBody } from '../../middleware/validation.middleware.js';
import { createGoalSchema, updateGoalSchema } from './goals.schema.js';
import { createGoal, getGoals, getGoal, updateGoal, deleteGoal, pauseGoal, resumeGoal } from './goals.controller.js';

const router = Router();

router.use(authenticate);
router.post('/', validateBody(createGoalSchema), createGoal);
router.get('/', getGoals);
router.get('/:id', getGoal);
router.patch('/:id', validateBody(updateGoalSchema), updateGoal);
router.delete('/:id', deleteGoal);
router.post('/:id/pause', pauseGoal);
router.post('/:id/resume', resumeGoal);

export { router };
