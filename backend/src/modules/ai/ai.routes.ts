import { Router } from 'express';
import { authenticate } from '../../middleware/auth.middleware.js';
import { chatWithAI, getAIRecommendations } from './ai.controller.js';

const router = Router();
router.use(authenticate);
router.post('/chat', chatWithAI);
router.get('/recommendations', getAIRecommendations);

export { router };
