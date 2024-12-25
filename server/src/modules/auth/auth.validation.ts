import { z } from 'zod';

const loginWithCredentialsSchema = z.object({
  userId: z.string().min(1, { message: 'UserId is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const authValidation = { loginWithCredentialsSchema };

export type TLoginWithCredentialsPayload = z.infer<typeof loginWithCredentialsSchema>;
