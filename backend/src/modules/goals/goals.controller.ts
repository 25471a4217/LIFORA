import { Request, Response } from 'express';
import { prisma } from '../../config/database.js';

export async function createGoal(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const data = req.body;
  const goal = await prisma.goal.create({ data: { userId: req.user.id, ...data, targetDate: data.targetDate ? new Date(data.targetDate) : undefined } });
  return res.status(201).json({ success: true, data: { goal }, message: 'Goal created' });
}

export async function getGoals(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const goals = await prisma.goal.findMany({ where: { userId: req.user.id } });
  return res.json({ success: true, data: { goals }, message: 'Goals retrieved' });
}

export async function getGoal(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const { id } = req.params;
  const goal = await prisma.goal.findFirst({ where: { id, userId: req.user.id } });
  if (!goal) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Goal not found' } });
  return res.json({ success: true, data: { goal }, message: 'Goal retrieved' });
}

export async function updateGoal(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const { id } = req.params;
  const goal = await prisma.goal.findFirst({ where: { id, userId: req.user.id } });
  if (!goal) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Goal not found' } });
  const data = req.body;
  const updated = await prisma.goal.update({ where: { id }, data: { ...data, targetDate: data.targetDate ? new Date(data.targetDate) : undefined } });
  return res.json({ success: true, data: { goal: updated }, message: 'Goal updated' });
}

export async function deleteGoal(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const { id } = req.params;
  await prisma.goal.deleteMany({ where: { id, userId: req.user.id } });
  return res.json({ success: true, data: null, message: 'Goal deleted' });
}

export async function pauseGoal(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const { id } = req.params;
  const goal = await prisma.goal.updateMany({ where: { id, userId: req.user.id }, data: { status: 'PAUSED' } });
  if (goal.count === 0) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Goal not found' } });
  return res.json({ success: true, data: null, message: 'Goal paused' });
}

export async function resumeGoal(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const { id } = req.params;
  const goal = await prisma.goal.updateMany({ where: { id, userId: req.user.id }, data: { status: 'ACTIVE' } });
  if (goal.count === 0) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Goal not found' } });
  return res.json({ success: true, data: null, message: 'Goal resumed' });
}
