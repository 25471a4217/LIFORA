import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const getEnv = (key: string, fallback?: string) => {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing environment variable ${key}`);
  }
  return value;
};

export const env = {
  PORT: Number(process.env.PORT ?? 4000),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  DATABASE_URL: getEnv('DATABASE_URL'),
  REDIS_URL: getEnv('REDIS_URL'),
  JWT_ACCESS_SECRET: getEnv('JWT_ACCESS_SECRET'),
  JWT_REFRESH_SECRET: getEnv('JWT_REFRESH_SECRET'),
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES ?? '15m',
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES ?? '7d',
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? '*',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? '',
  OPENAI_API_URL: process.env.OPENAI_API_URL ?? 'https://api.openai.com/v1/chat/completions',
  FCM_SERVER_KEY: process.env.FCM_SERVER_KEY ?? '',
};