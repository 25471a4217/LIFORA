import { Request, Response } from 'express';
import { prisma } from '../../config/database.js';

export async function postProfile(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const { name, age, gender, profession } = req.body;
  const user = await prisma.user.update({ where: { id: req.user.id }, data: { name, age, gender, profession } });
  return res.json({ success: true, data: { user }, message: 'Profile saved' });
}

export async function postFocusAreas(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const { focusAreas } = req.body;
  await prisma.userFocusArea.deleteMany({ where: { userId: req.user.id } });
  const focusAreaRecords = await Promise.all(
    focusAreas.map(async (name: string) => {
      const focusArea = await prisma.focusArea.upsert({ where: { name }, update: {}, create: { name } });
      return prisma.userFocusArea.create({ data: { userId: req.user.id, focusAreaId: focusArea.id } });
    })
  );
  return res.json({ success: true, data: { focusAreas: focusAreaRecords.map((record) => record.focusAreaId) }, message: 'Focus areas saved' });
}

export async function postGoal(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const { title, description, category, targetDate } = req.body;
  const goal = await prisma.goal.create({ data: { userId: req.user.id, title, description, category, targetDate: targetDate ? new Date(targetDate) : undefined } });
  return res.status(201).json({ success: true, data: { goal }, message: 'Goal saved' });
}

export async function postAvailability(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const { availableDailyMinutes, timezone } = req.body;
  const user = await prisma.user.update({ where: { id: req.user.id }, data: { availableDailyMinutes, timezone } });
  return res.json({ success: true, data: { user }, message: 'Availability saved' });
}

export async function completeOnboarding(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const user = await prisma.user.update({ where: { id: req.user.id }, data: { onboardingCompleted: true } });
  return res.json({ success: true, data: { user }, message: 'Onboarding complete' });
}

export async function getStatus(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const user = await prisma.user.findUnique({ where: { id: req.user.id }, select: { onboardingCompleted: true, name: true, profession: true, availableDailyMinutes: true, timezone: true } });
  return res.json({ success: true, data: { onboarding: user }, message: 'Status retrieved' });
}
