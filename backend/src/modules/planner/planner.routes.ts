import { Router } from 'express';
import { authenticate } from '../../middleware/auth.middleware.js';
import { getTodayPlanner, getRecoveryPlan, createDailyPlan } from '../../services/planner.service.js';

const router = Router();
router.use(authenticate);

router.get('/today', async (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const planner = await getTodayPlanner(req.user.id);
  return res.json({ success: true, data: planner, message: 'Planner generated' });
});

router.post('/generate', async (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const plan = await createDailyPlan(req.user.id);
  return res.json({ success: true, data: plan?.payload, message: 'Daily plan generated' });
});

router.get('/recovery', async (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const recovery = await getRecoveryPlan(req.user.id);
  return res.json({ success: true, data: recovery, message: 'Recovery plan retrieved' });
});

export { router };
