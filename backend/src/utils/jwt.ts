import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function signAccessToken(payload: { userId: string; role: string }) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: env.JWT_ACCESS_EXPIRES });
}

export function signRefreshToken(payload: { userId: string; role: string }) {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRES });
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as { userId: string; role: string };
}
