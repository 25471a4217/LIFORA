import { prisma } from '../config/database.js';

export async function getTodayAnalytics(userId: string) {
  const completed = await prisma.task.count({ where: { userId, status: 'COMPLETED', updatedAt: { gte: new Date(new Date().setHours(0,0,0,0)) } } });
  const total = await prisma.task.count({ where: { userId, updatedAt: { gte: new Date(new Date().setHours(0,0,0,0)) } } });
  return { completed, total, completionRate: total ? Math.round((completed / total) * 100) : 0 };
}

export async function getWeekAnalytics(userId: string) {
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0,0,0,0);
  const completed = await prisma.task.count({ where: { userId, status: 'COMPLETED', updatedAt: { gte: weekStart } } });
  return { completed, timeframe: 'week' };
}

export async function getMonthAnalytics(userId: string) {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const completed = await prisma.task.count({ where: { userId, status: 'COMPLETED', updatedAt: { gte: monthStart } } });
  return { completed, timeframe: 'month' };
}
