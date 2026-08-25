import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  goalId: z.string().uuid().optional(),
  skillId: z.string().uuid().optional(),
  category: z.string().optional(),
  priority: z.enum(['LOW','MEDIUM','HIGH','CRITICAL']).optional(),
  estimatedMinutes: z.number().int().nonnegative().optional(),
  scheduledStart: z.string().optional(),
  scheduledEnd: z.string().optional(),
  difficulty: z.enum(['EASY','MEDIUM','HARD']).optional(),
  source: z.string().optional(),
  verificationRequired: z.boolean().optional(),
});

export const updateTaskSchema = createTaskSchema.partial();
