import { PropsWithChildren } from 'react';
import { QueryProvider } from './query-provider';
import { AuthProvider } from './auth/auth-provider';

export function Providers({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <QueryProvider>{children}</QueryProvider>
    </AuthProvider>
  );
}
