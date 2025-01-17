import jwt from 'jsonwebtoken';

import { TLoggedUser } from '@/types';
import { AUTH_SECRET } from '@/lib/config';

export const generateAccessToken = (payload: TLoggedUser) => {
  return jwt.sign(payload, AUTH_SECRET!);
};
