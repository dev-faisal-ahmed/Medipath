import { z } from 'zod';

const addServiceSchema = z.object({
  name: z.string().min(1, { message: 'Service name is required' }),
  price: z.number().min(49, { message: 'Minimum price is 50 tk' }),
  roomNo: z.string().min(1, { message: 'Empty string is not allowed' }).optional(),
});

const updateServiceSchema = z.object({
  name: z.string().min(1, { message: 'Service name can not be empty string' }).optional(),
  price: z.number().min(49, { message: 'Minimum price is 50 tk' }).optional(),
  roomNo: z.string().min(1, { message: 'Empty string is not allowed' }).optional(),
});

export const serviceValidation = { addServiceSchema, updateServiceSchema };

export type TAddServicePayload = z.infer<typeof addServiceSchema>;
export type TUpdateServicePayload = z.infer<typeof updateServiceSchema>;
