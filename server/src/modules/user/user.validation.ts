import { z } from 'zod';

const addUserSchema = z.object({
  userId: z.string(),
});

export const userValidation = {};
