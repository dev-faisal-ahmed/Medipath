'use client';

import { useAuth } from '@/hooks';
import { PropsWithChildren } from 'react';

export function MainLayout({ children }: PropsWithChildren) {
  useAuth();

  return <main className="grid h-dvh grid-cols-[280px_1fr]">{children}</main>;
}
