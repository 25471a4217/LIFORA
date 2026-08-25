import { Router } from 'express';
import { authenticate } from '../../middleware/auth.middleware.js';
import { getNotifications } from './notifications.controller.js';

const router = Router();
router.use(authenticate);

router.get('/', getNotifications);

export { router };
