'use client';

import { Toaster } from 'sonner';
import { PropsWithChildren } from 'react';
import { QueryProvider } from './query-client.provider';

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <QueryProvider>
        {children}
        <Toaster richColors duration={2000} />
      </QueryProvider>
    </>
  );
}
