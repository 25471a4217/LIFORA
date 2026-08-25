import { Router } from 'express';
import { router as authRouter } from '../modules/auth/auth.routes.js';
import { router as usersRouter } from '../modules/users/users.routes.js';
import { router as onboardingRouter } from '../modules/onboarding/onboarding.routes.js';
import { router as goalsRouter } from '../modules/goals/goals.routes.js';
import { router as tasksRouter } from '../modules/tasks/tasks.routes.js';
import { router as plannerRouter } from '../modules/planner/planner.routes.js';
import { router as analyticsRouter } from '../modules/analytics/analytics.routes.js';
import { router as aiRouter } from '../modules/ai/ai.routes.js';
import { router as notificationsRouter } from '../modules/notifications/notifications.routes.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/onboarding', onboardingRouter);
router.use('/goals', goalsRouter);
router.use('/tasks', tasksRouter);
router.use('/planner', plannerRouter);
router.use('/analytics', analyticsRouter);
router.use('/ai', aiRouter);
router.use('/notifications', notificationsRouter);

export { router };
