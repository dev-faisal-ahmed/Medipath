'use client';

import { Toaster } from 'sonner';
import { PropsWithChildren } from 'react';
import { QueryProvider } from './query.provider';
import { ThemeProvider } from './theme.provider';
import { TooltipProvider } from '../ui/tooltip';

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <QueryProvider>
        <TooltipProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <Toaster richColors duration={2000} />
          </ThemeProvider>
        </TooltipProvider>
      </QueryProvider>
    </>
  );
}
