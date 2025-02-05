'use client';

import { PropsWithChildren } from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { ScrollArea } from '@/components/ui/scroll-area';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex h-dvh w-full">
      <Sidebar className="hidden md:flex" />
      <section className="flex h-dvh w-full flex-col">
        <Topbar />
        <ScrollArea className="grow" fixedLayout>
          {children}
        </ScrollArea>
      </section>
    </main>
  );
};
