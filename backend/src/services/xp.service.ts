import { prisma } from '../config/database.js';

export async function createXPTransaction(userId: string, amount: number, source: string) {
  const transaction = await prisma.xPTransaction.create({ data: { userId, amount, source } });
  const total = await prisma.xPTransaction.aggregate({ where: { userId }, sum: { amount: true } });
  return { transaction, totalXP: total.sum?.amount ?? 0 };
}

export async function getUserXP(userId: string) {
  const total = await prisma.xPTransaction.aggregate({ where: { userId }, sum: { amount: true } });
  return total.sum?.amount ?? 0;
}
