import jwt from 'jsonwebtoken';

import { TLoggedUser } from '../types';
import { AUTH_SECRET } from '../config';

export function generateAccessToken(payload: TLoggedUser) {
  return jwt.sign(payload, AUTH_SECRET!);
}
