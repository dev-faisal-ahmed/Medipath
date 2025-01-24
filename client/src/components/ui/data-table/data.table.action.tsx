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

export const DataTableAction = ({ open, onOpenChange, children }: TDataTableActionProps) => {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <section className="flex flex-col gap-2">{children}</section>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// type
type TDataTableActionProps = { open: boolean; onOpenChange(open: boolean): void; children: ReactNode };
