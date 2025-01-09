'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EllipsisIcon, LockKeyholeIcon, LogOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { logOut } from '@/actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface IProps {
  trigger?: ReactNode;
  asChild?: boolean;
  children?: ReactNode;
}

export function ProfileMenu({ trigger, asChild, children }: IProps) {
  const router = useRouter();
  async function onLogout() {
    await logOut();
    toast.success('You have been logged out...');
    router.push('/auth/login');
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none" asChild={asChild}>
        {trigger || <EllipsisIcon />}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2">
        {children}
        <Button variant="primary_ghost" className="flex w-full items-center justify-start gap-2">
          <LockKeyholeIcon size={16} /> Change Password
        </Button>
        <Button onClick={onLogout} variant="destructive_ghost" className="flex w-full items-center justify-start gap-2">
          <LogOutIcon size={16} /> Logout
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
