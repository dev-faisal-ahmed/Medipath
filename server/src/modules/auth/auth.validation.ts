import { z } from 'zod';

const loginWithCredentialsSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

const loginWithGoogleSchema = z.object({
  email: z.string().email({ message: 'UserId is required' }),
});

export const authValidation = { loginWithCredentialsSchema, loginWithGoogleSchema };

export type TLoginWithCredentialsPayload = z.infer<typeof loginWithCredentialsSchema>;
export type TLoginWithGooglePayload = z.infer<typeof loginWithGoogleSchema>;
