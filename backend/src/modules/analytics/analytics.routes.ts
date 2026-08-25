import { Router } from 'express';
import { authenticate } from '../../middleware/auth.middleware.js';
import { getTodayAnalyticsReport, getWeekAnalyticsReport, getMonthAnalyticsReport } from './analytics.controller.js';

const router = Router();
router.use(authenticate);
router.get('/today', getTodayAnalyticsReport);
router.get('/week', getWeekAnalyticsReport);
router.get('/month', getMonthAnalyticsReport);

export { router };
