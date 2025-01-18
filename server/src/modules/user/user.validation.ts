import { z } from 'zod';
import { PROVIDER, USER_ROLE } from './user.interface';

const addUserSchema = z.object({
  email: z.string().email({ message: 'Invalid Email' }),
  name: z.string().min(1, { message: 'Name is required' }),
  role: z.nativeEnum(USER_ROLE, { message: 'Invalid role' }),
  provider: z.nativeEnum(PROVIDER, { message: 'Invalid provider' }),
});

export const userValidation = { addUserSchema };

export type TAddUserPayload = z.infer<typeof addUserSchema> & {
  role: USER_ROLE;
  provider: PROVIDER;
  password: string;
};
