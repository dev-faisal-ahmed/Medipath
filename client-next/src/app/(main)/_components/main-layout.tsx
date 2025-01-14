'use client';

import { useAuth } from '@/hooks';
import { PropsWithChildren } from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar/topbar';
import { TopbarProvider } from '@/components/providers';
import { ScrollArea } from '@/components/ui/scroll-area';

export function MainLayout({ children }: PropsWithChildren) {
  useAuth();

  return (
    <main className="grid h-dvh grid-cols-[280px_1fr]">
      <Sidebar />
      <section className="flex h-dvh flex-col">
        <TopbarProvider>
          <Topbar />
          <ScrollArea className="grow">{children}</ScrollArea>
        </TopbarProvider>
      </section>
    </main>
  );
}
