import { Request, Response } from 'express';
import { sendAIMessage, generateFallbackRecommendation } from '../../services/ai.service.js';

export async function chatWithAI(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const messages = Array.isArray(req.body.messages) ? req.body.messages : [{ role: 'user', content: req.body.prompt || 'Help me optimize my daily productivity.' }];
  try {
    const payload = await sendAIMessage(req.user.id, messages);
    return res.json({ success: true, data: payload, message: 'AI response generated' });
  } catch (error) {
    const fallback = generateFallbackRecommendation();
    return res.status(503).json({ success: true, data: fallback, message: 'AI service unavailable, returned fallback recommendations' });
  }
}

export async function getAIRecommendations(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const recommendation = generateFallbackRecommendation();
  return res.json({ success: true, data: recommendation, message: 'AI recommendations provided' });
}
