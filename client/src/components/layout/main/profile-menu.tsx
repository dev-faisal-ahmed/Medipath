import { EllipsisIcon, LockKeyholeIcon, LogOutIcon } from 'lucide-react';
import { ReactNode, useLocation, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { removeAccessTokenFromLocal } from '@/helper';

interface IProps {
  trigger?: ReactNode;
  asChild?: boolean;
  children?: ReactNode;
}

export function ProfileMenu({ trigger, asChild, children }: IProps) {
  const navigate = useNavigate();
  const { href } = useLocation();
  function onLogout() {
    removeAccessTokenFromLocal();
    navigate({ to: '/login', search: { redirect: href } });
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
