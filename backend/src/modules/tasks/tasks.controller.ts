import { Request, Response } from 'express';
import { prisma } from '../../config/database.js';
import { createDailyPlan } from '../../services/planner.service.js';
import { createXPTransaction } from '../../services/xp.service.js';

export async function createTask(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const data = req.body;
  const task = await prisma.task.create({ data: { userId: req.user.id, ...data, scheduledStart: data.scheduledStart ? new Date(data.scheduledStart) : undefined, scheduledEnd: data.scheduledEnd ? new Date(data.scheduledEnd) : undefined } });
  return res.status(201).json({ success: true, data: { task }, message: 'Task created' });
}

export async function getTasks(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const tasks = await prisma.task.findMany({ where: { userId: req.user.id } });
  return res.json({ success: true, data: { tasks }, message: 'Tasks retrieved' });
}

export async function getTodayTasks(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const now = new Date();
  const tasks = await prisma.task.findMany({ where: { userId: req.user.id, scheduledStart: { gte: new Date(now.setHours(0,0,0,0)), lt: new Date(now.setHours(23,59,59,999)) } } });
  return res.json({ success: true, data: { tasks }, message: 'Today tasks retrieved' });
}

export async function getWeekTasks(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay());
  start.setHours(0,0,0,0);
  const end = new Date(start);
  end.setDate(start.getDate() + 7);
  const tasks = await prisma.task.findMany({ where: { userId: req.user.id, scheduledStart: { gte: start, lt: end } } });
  return res.json({ success: true, data: { tasks }, message: 'Week tasks retrieved' });
}

export async function getTask(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const { id } = req.params;
  const task = await prisma.task.findFirst({ where: { id, userId: req.user.id } });
  if (!task) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Task not found' } });
  return res.json({ success: true, data: { task }, message: 'Task retrieved' });
}

export async function updateTask(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const { id } = req.params;
  const task = await prisma.task.findFirst({ where: { id, userId: req.user.id } });
  if (!task) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Task not found' } });
  const data = req.body;
  const updated = await prisma.task.update({ where: { id }, data: { ...data, scheduledStart: data.scheduledStart ? new Date(data.scheduledStart) : undefined, scheduledEnd: data.scheduledEnd ? new Date(data.scheduledEnd) : undefined } });
  return res.json({ success: true, data: { task: updated }, message: 'Task updated' });
}

export async function deleteTask(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const { id } = req.params;
  await prisma.task.deleteMany({ where: { id, userId: req.user.id } });
  return res.json({ success: true, data: null, message: 'Task deleted' });
}

export async function startTask(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const { id } = req.params;
  const task = await prisma.task.updateMany({ where: { id, userId: req.user.id }, data: { status: 'IN_PROGRESS' } });
  if (task.count === 0) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Task not found' } });
  return res.json({ success: true, data: null, message: 'Task started' });
}

export async function completeTask(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const { id } = req.params;
  const task = await prisma.task.findFirst({ where: { id, userId: req.user.id } });
  if (!task) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Task not found' } });
  const completed = await prisma.task.update({ where: { id }, data: { status: 'COMPLETED' } });
  await createXPTransaction(req.user.id, task.estimatedMinutes || 20, `Task complete: ${task.title}`);
  await createDailyPlan(req.user.id);
  return res.json({ success: true, data: { task: completed }, message: 'Task completed' });
}

export async function skipTask(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const { id } = req.params;
  const task = await prisma.task.updateMany({ where: { id, userId: req.user.id }, data: { status: 'SKIPPED' } });
  if (task.count === 0) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Task not found' } });
  return res.json({ success: true, data: null, message: 'Task skipped' });
}
