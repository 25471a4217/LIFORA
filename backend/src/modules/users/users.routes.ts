import { Router } from 'express';
import { authenticate } from '../../middleware/auth.middleware.js';
import { validateBody } from '../../middleware/validation.middleware.js';
import { getMe, updateMe, deleteMe } from './users.controller.js';
import { updateProfileSchema } from './users.schema.js';

const router = Router();

router.use(authenticate);
router.get('/me', getMe);
router.patch('/me', validateBody(updateProfileSchema), updateMe);
router.delete('/me', deleteMe);

export { router };
