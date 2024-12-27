import { ILoggedUser } from '@/lib/types';
import { createContext } from 'react';

export interface IAuthContext {
  user: ILoggedUser | null;
  login(user: ILoggedUser): void;
  logout(): void;
}

export const AuthContext = createContext<IAuthContext | null>(null);
