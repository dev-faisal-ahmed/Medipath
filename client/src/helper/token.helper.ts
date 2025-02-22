import jwt from 'jsonwebtoken';

import { TLoggedUser } from '@/types';
import { NEXTAUTH_SECRET } from '@/lib/config';

export const generateAccessToken = (payload: TLoggedUser) => jwt.sign(payload, NEXTAUTH_SECRET!);
