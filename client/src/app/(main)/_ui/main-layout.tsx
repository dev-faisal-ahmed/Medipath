'use client';

import { useAuth } from '@/hooks';
import { PropsWithChildren } from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';

export const MainLayout = ({ children }: PropsWithChildren) => {
  useAuth();

  return (
    <main className="grid h-dvh md:grid-cols-[280px_1fr]">
      <Sidebar className="hidden md:flex" />
      <section className="flex h-dvh flex-col overflow-hidden">
        <Topbar />
        {children}
      </section>
    </main>
  );
};
