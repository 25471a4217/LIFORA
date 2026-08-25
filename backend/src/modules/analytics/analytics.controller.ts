import { Request, Response } from 'express';
import { getTodayAnalytics, getWeekAnalytics, getMonthAnalytics } from '../../services/analytics.service.js';

export async function getTodayAnalyticsReport(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const data = await getTodayAnalytics(req.user.id);
  return res.json({ success: true, data, message: 'Today analytics fetched' });
}

export async function getWeekAnalyticsReport(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const data = await getWeekAnalytics(req.user.id);
  return res.json({ success: true, data, message: 'Weekly analytics fetched' });
}

export async function getMonthAnalyticsReport(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const data = await getMonthAnalytics(req.user.id);
  return res.json({ success: true, data, message: 'Monthly analytics fetched' });
}
