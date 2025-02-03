'use client';

import { Toaster } from 'sonner';
import { PropsWithChildren } from 'react';
import { QueryProvider } from './query.provider';
import { ThemeProvider } from './theme.provider';
import { TooltipProvider } from '../ui/tooltip';
import { AuthProvider } from './auth.provider';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <AuthProvider>
        <QueryProvider>
          <TooltipProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              {children}
              <Toaster richColors duration={2000} />
            </ThemeProvider>
          </TooltipProvider>
        </QueryProvider>
      </AuthProvider>
    </>
  );
};
