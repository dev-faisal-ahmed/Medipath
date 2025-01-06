import { z } from 'zod';
import { Types } from 'mongoose';

const addBill = z.object({
  referrerId: z
    .string()
    .refine((value) => Types.ObjectId.isValid(value), { message: 'Invalid ReferrerId' })
    .optional(),
});

export const billValidation = { addBill };
