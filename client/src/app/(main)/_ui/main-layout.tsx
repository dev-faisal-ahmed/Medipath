'use client';

import { PropsWithChildren } from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePopupState } from '@/hooks';

export const MainLayout = ({ children }: PropsWithChildren) => {
  const { open, onOpenChange } = usePopupState();

  return (
    <main className="flex h-dvh w-full">
      {open && <Sidebar className="hidden min-w-[260px] md:flex" />}
      <section className="flex h-dvh w-full flex-col">
        <Topbar open={open} onOpenChange={onOpenChange} />
        <ScrollArea className="grow" fixedLayout>
          {children}
        </ScrollArea>
      </section>
    </main>
  );
};
