import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(2),
  age: z.number().int().positive(),
  gender: z.string().optional(),
  profession: z.string().optional(),
});

export const focusAreasSchema = z.object({
  focusAreas: z.array(z.string()).min(1).max(5),
});

export const goalSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  category: z.string().optional(),
  targetDate: z.string().optional(),
});

export const availabilitySchema = z.object({
  availableDailyMinutes: z.number().int().positive(),
  timezone: z.string().optional(),
  timeslots: z.array(z.string()).optional(),
});
