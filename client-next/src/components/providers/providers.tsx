'use client';

import { Toaster } from 'sonner';
import { PropsWithChildren } from 'react';
import { QueryProvider } from './query.provider';
import { ThemeProvider } from './theme.provider';

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <QueryProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster richColors duration={2000} />
        </ThemeProvider>
      </QueryProvider>
    </>
  );
}
