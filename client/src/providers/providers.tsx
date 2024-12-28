import { PropsWithChildren } from 'react';
import { QueryProvider } from './query.provider';
import { TooltipProvider } from '@/components/ui/tooltip';

export function Providers({ children }: PropsWithChildren) {
  return (
    <TooltipProvider>
      <QueryProvider>{children}</QueryProvider>
    </TooltipProvider>
  );
}
