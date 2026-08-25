import { Router } from 'express';
import { authenticate } from '../../middleware/auth.middleware.js';
import { validateBody } from '../../middleware/validation.middleware.js';
import { profileSchema, focusAreasSchema, goalSchema, availabilitySchema } from './onboarding.schema.js';
import { postProfile, postFocusAreas, postGoal, postAvailability, completeOnboarding, getStatus } from './onboarding.controller.js';

const router = Router();

router.use(authenticate);
router.post('/profile', validateBody(profileSchema), postProfile);
router.post('/focus-areas', validateBody(focusAreasSchema), postFocusAreas);
router.post('/goal', validateBody(goalSchema), postGoal);
router.post('/availability', validateBody(availabilitySchema), postAvailability);
router.post('/complete', completeOnboarding);
router.get('/status', getStatus);

export { router };
