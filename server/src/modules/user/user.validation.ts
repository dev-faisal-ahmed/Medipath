import { z } from 'zod';
import { zodEnum } from '../../helpers';
import { PROVIDER, USER_ROLE } from './user.interface';

const addUserSchema = z.object({
  email: z.string().email({ message: 'Invalid Email' }),
  name: z.string().min(1, { message: 'Name is required' }),
  role: zodEnum({ options: Object.values(USER_ROLE), message: 'Invalid Role' }),
  provider: zodEnum({ options: Object.values(PROVIDER), message: 'Invalid provider' }),
});

export const userValidation = { addUserSchema };

export type TAddUserPayload = z.infer<typeof addUserSchema> & {
  role: USER_ROLE;
  provider: PROVIDER;
  password: string;
};
