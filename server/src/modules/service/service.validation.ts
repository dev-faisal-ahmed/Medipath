import { z } from 'zod';

const addService = z.object({
  name: z.string().min(1, { message: 'Service name is required' }),
  price: z.number().min(49, { message: 'Minimum price is 50 tk' }),
  roomNo: z.string().min(1, { message: 'Empty string is not allowed' }).optional(),
});

const updateService = z.object({
  name: z.string().min(1, { message: 'Service name can not be empty string' }).optional(),
  price: z.number().min(49, { message: 'Minimum price is 50 tk' }).optional(),
  roomNo: z.string().min(1, { message: 'Empty string is not allowed' }).optional(),
});

export const serviceValidation = { addService, updateService };

export type TAddServicePayload = z.infer<typeof addService>;
export type TUpdateServicePayload = z.infer<typeof updateService>;
