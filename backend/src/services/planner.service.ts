import { prisma } from '../config/database.js';

export async function createDailyPlan(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return null;
  const unfinishedTasks = await prisma.task.findMany({ where: { userId, status: { in: ['TODO','IN_PROGRESS','RESCHEDULED'] } }, orderBy: { priority: 'desc' } });
  const tasks = unfinishedTasks.slice(0, 5).map((task) => ({ title: task.title, estimatedMinutes: task.estimatedMinutes, priorityBucket: 'NOW', reason: 'High priority task aligned with your goal' }));
  const plan = await prisma.dailyPlan.upsert({ where: { userId_date: { userId, date: new Date(new Date().toDateString()) } }, update: { payload: { tasks }, updatedAt: new Date() }, create: { userId, date: new Date(new Date().toDateString()), payload: { tasks } } });
  return plan;
}

export async function getTodayPlanner(userId: string) {
  const plan = await prisma.dailyPlan.findUnique({ where: { userId_date: { userId, date: new Date(new Date().toDateString()) } } });
  if (plan) return plan.payload;
  return createDailyPlan(userId);
}

export async function getRecoveryPlan(userId: string) {
  const missed = await prisma.task.findMany({ where: { userId, status: 'MISSED' } });
  const recovery = missed.map((task) => ({ title: task.title, today: Math.ceil(task.estimatedMinutes * 0.4), tomorrow: Math.ceil(task.estimatedMinutes * 0.6), weekend: 'Review session' }));
  return { recovery }; 
}
