import { PropsWithChildren } from 'react';
import { QueryProvider } from './query-provider';
import { AuthProvider } from './auth/auth-provider';
import { TooltipProvider } from '@/components/ui/tooltip';

export function Providers({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <TooltipProvider>
        <QueryProvider>{children}</QueryProvider>
      </TooltipProvider>
    </AuthProvider>
  );
}
