import { z } from 'zod';
import { REFERRER_TYPE } from './referrer.interface';

const addReferrerSchema = z.object({
  name: z.string().min(1, { message: 'Referrer name is required' }),
  designation: z.string().min(1, { message: 'Designation can not be empty string' }).optional(),
  type: z.nativeEnum(REFERRER_TYPE, { message: 'Invalid referrer type' }),
  phone: z.string().min(11, { message: 'Invalid phone' }).optional(),
});

const updateReferrerSchema = z.object({
  name: z.string().min(1, { message: 'Referrer name is required' }).optional(),
  designation: z.string().min(1, { message: 'Designation can not be empty string' }).optional(),
  type: z.nativeEnum(REFERRER_TYPE, { message: 'Invalid referrer type' }).optional(),
  phone: z.string().min(11, { message: 'Invalid phone' }).optional(),
});

export const referrerValidation = { addReferrerSchema, updateReferrerSchema };

export type TAddReferrerPayload = z.infer<typeof addReferrerSchema>;
export type TUpdateReferrerPayload = z.infer<typeof updateReferrerSchema>;
