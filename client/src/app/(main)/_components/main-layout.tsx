'use client';

import { useAuth } from '@/hooks';
import { PropsWithChildren } from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { TopbarProvider } from '@/components/providers';
import { ScrollArea } from '@/components/ui/scroll-area';

export const MainLayout = ({ children }: PropsWithChildren) => {
  useAuth();

  return (
    <main className="grid h-dvh grid-cols-[280px_1fr]">
      <Sidebar />
      <ScrollArea className="h-dvh">
        <TopbarProvider>
          <Topbar />
          <section className="p-6"> {children}</section>
        </TopbarProvider>
      </ScrollArea>
    </main>
  );
};
