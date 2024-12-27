import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ReactNode } from '@tanstack/react-router';
import { EllipsisIcon, LockKeyholeIcon, LogOutIcon } from 'lucide-react';

interface IProps {
  trigger?: ReactNode;
  asChild?: boolean;
  children?: ReactNode;
}

export function ProfileMenu({ trigger, asChild, children }: IProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none" asChild={asChild}>
        {trigger || <EllipsisIcon />}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2">
        {children}
        <Button variant="ghost" className="flex w-full items-center justify-start gap-2">
          <LockKeyholeIcon size={16} /> Change Password
        </Button>
        <Button variant="ghost" className="flex w-full items-center justify-start gap-2">
          <LogOutIcon size={16} /> Logout
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
