import { getLoggedUser } from '@/helper';
import { ILoggedUser } from '@/lib/types';
import { AuthContext } from './auth-context';
import { PropsWithChildren, useCallback, useState } from 'react';

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<ILoggedUser | null>(getLoggedUser());

  const login = useCallback((user: ILoggedUser) => {
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
