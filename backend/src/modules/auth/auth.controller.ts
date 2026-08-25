import { Request, Response } from 'express';
import { prisma } from '../../config/database.js';
import { comparePassword, hashPassword } from '../../utils/password.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt.js';
import { nanoid } from 'nanoid';

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ success: false, error: { code: 'EMAIL_TAKEN', message: 'Email already registered' } });
  }
  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({ data: { name, email, passwordHash } });
  const accessToken = signAccessToken({ userId: user.id, role: user.role });
  const refreshToken = signRefreshToken({ userId: user.id, role: user.role });
  await prisma.user.update({ where: { id: user.id }, data: { refreshTokenHash: await hashPassword(refreshToken) } });
  return res.status(201).json({ success: true, data: { user: { id: user.id, name: user.name, email: user.email }, accessToken, refreshToken }, message: 'Registered successfully' });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Email or password invalid' } });
  }
  const valid = await comparePassword(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Email or password invalid' } });
  }
  const accessToken = signAccessToken({ userId: user.id, role: user.role });
  const refreshToken = signRefreshToken({ userId: user.id, role: user.role });
  await prisma.user.update({ where: { id: user.id }, data: { refreshTokenHash: await hashPassword(refreshToken) } });
  return res.json({ success: true, data: { user: { id: user.id, name: user.name, email: user.email }, accessToken, refreshToken }, message: 'Login successful' });
}

export async function refresh(req: Request, res: Response) {
  const { refreshToken } = req.body;
  try {
    const payload = verifyRefreshToken(refreshToken);
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user || !user.refreshTokenHash) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Refresh token invalid' } });
    }
    const valid = await comparePassword(refreshToken, user.refreshTokenHash);
    if (!valid) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Refresh token invalid' } });
    }
    const accessToken = signAccessToken({ userId: user.id, role: user.role });
    const newRefreshToken = signRefreshToken({ userId: user.id, role: user.role });
    await prisma.user.update({ where: { id: user.id }, data: { refreshTokenHash: await hashPassword(newRefreshToken) } });
    return res.json({ success: true, data: { accessToken, refreshToken: newRefreshToken }, message: 'Token refreshed' });
  } catch (error) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Refresh token invalid or expired' } });
  }
}

export async function logout(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  }
  await prisma.user.update({ where: { id: req.user.id }, data: { refreshTokenHash: null } });
  return res.json({ success: true, data: null, message: 'Logged out' });
}

export async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(200).json({ success: true, data: null, message: 'If the account exists, a password reset link was sent.' });
  }
  return res.json({ success: true, data: null, message: 'Password reset flow is mocked in this demo.' });
}

export async function resetPassword(req: Request, res: Response) {
  const { password } = req.body;
  if (!req.user) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  }
  const passwordHash = await hashPassword(password);
  await prisma.user.update({ where: { id: req.user.id }, data: { passwordHash } });
  return res.json({ success: true, data: null, message: 'Password reset successfully' });
}

export async function me(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
  }
  const user = await prisma.user.findUnique({ where: { id: req.user.id }, select: { id: true, name: true, email: true, age: true, gender: true, profession: true, availableDailyMinutes: true, timezone: true, avatar: true, onboardingCompleted: true, role: true } });
  return res.json({ success: true, data: { user }, message: 'Success' });
}
