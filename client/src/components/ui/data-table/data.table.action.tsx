'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../dropdown-menu';

import { ReactNode } from 'react';
import { Button } from '../button';
import { EllipsisIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const DataTableAction = ({ open, onOpenChange, className, children }: TDataTableActionProps) => {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn(className?.content)}>
        <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <section className={cn('flex flex-col gap-2', className?.childContainer)}>{children}</section>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// type
type TDataTableActionProps = {
  open: boolean;
  onOpenChange(open: boolean): void;
  children: ReactNode;
  className?: { content?: string; childContainer?: string };
};
