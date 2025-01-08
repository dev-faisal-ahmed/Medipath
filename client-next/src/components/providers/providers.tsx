'use client';

import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Toaster richColors duration={2000} />
    </>
  );
}
