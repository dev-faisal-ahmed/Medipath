'use client';

import { toast } from 'sonner';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EllipsisIcon, LockKeyholeIcon, LogOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

export const ProfileMenu = ({ trigger, asChild, children }: TProfileMenuProps) => {
  const router = useRouter();

  const onLogout = async () => {
    signOut();
    toast.success('You have been logged out...');
    router.push('/auth/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none" asChild={asChild}>
        {trigger || <EllipsisIcon size={18} />}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2">
        {children}
        <Button variant="primary-ghost" className="flex w-full items-center justify-start gap-2">
          <LockKeyholeIcon size={16} /> Change Password
        </Button>
        <Button onClick={onLogout} variant="destructive-ghost" className="flex w-full items-center justify-start gap-2">
          <LogOutIcon size={16} /> Logout
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// type
type TProfileMenuProps = { trigger?: ReactNode; asChild?: boolean; children?: ReactNode };
