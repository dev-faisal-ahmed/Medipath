import { z } from 'zod';

const addService = z.object({
  name: z.string().min(1, { message: 'Service name is required' }),
  price: z.number().min(50, { message: 'Minimum price is 50 tk' }),
  roomNo: z.string().min(1, { message: 'Empty string is not allowed' }).optional(),
});

export const serviceValidation = { addService };

export type TAddServicePayload = z.infer<typeof addService>;
