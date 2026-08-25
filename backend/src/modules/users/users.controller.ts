import { Request, Response } from 'express';
import { prisma } from '../../config/database.js';

export async function getMe(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const user = await prisma.user.findUnique({ where: { id: req.user.id }, select: { id: true, name: true, email: true, age: true, gender: true, profession: true, availableDailyMinutes: true, timezone: true, avatar: true, onboardingCompleted: true } });
  return res.json({ success: true, data: { user }, message: 'Success' });
}

export async function updateMe(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const user = await prisma.user.update({ where: { id: req.user.id }, data: req.body });
  return res.json({ success: true, data: { user }, message: 'Profile updated' });
}

export async function deleteMe(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  await prisma.user.delete({ where: { id: req.user.id } });
  return res.json({ success: true, data: null, message: 'Account deleted' });
}
