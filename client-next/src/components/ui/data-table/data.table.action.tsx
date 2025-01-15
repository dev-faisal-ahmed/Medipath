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

interface IProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  children: ReactNode;
}

export function DataTableAction({ open, onOpenChange, children }: IProps) {
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
}
