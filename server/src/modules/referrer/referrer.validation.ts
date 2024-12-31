import { z } from 'zod';
import { zodEnum } from '../../helpers';
import { REFERRER_TYPE } from './referrer.interface';

const addReferrerSchema = z.object({
  name: z.string().min(1, { message: 'Referrer name is required' }),
  designation: z.string().min(1, { message: 'Designation can not be empty string' }).optional(),
  type: zodEnum({ options: Object.values(REFERRER_TYPE), message: 'Invalid referrer type' }),
  phone: z.string().min(11, { message: 'Invalid phone' }).optional(),
});

export const referrerValidation = { addReferrerSchema };

export type TAddReferrerPayload = z.infer<typeof addReferrerSchema>;
