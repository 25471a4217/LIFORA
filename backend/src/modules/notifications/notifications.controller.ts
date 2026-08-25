import { Request, Response } from 'express';
import { prisma } from '../../config/database.js';

export async function getNotifications(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  const notifications = await prisma.notification.findMany({ where: { userId: req.user.id }, orderBy: { createdAt: 'desc' } });
  return res.json({ success: true, data: { notifications }, message: 'Notifications retrieved' });
}
