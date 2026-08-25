import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  age: z.number().int().positive().optional(),
  gender: z.string().optional(),
  profession: z.string().optional(),
  availableDailyMinutes: z.number().int().positive().optional(),
  timezone: z.string().optional(),
  avatar: z.string().url().optional(),
  onboardingCompleted: z.boolean().optional(),
});
