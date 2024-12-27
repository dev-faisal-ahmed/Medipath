import { useMemo } from 'react';
import { PlusIcon } from 'lucide-react';
import { TooltipContainer } from '@/components/ui/tooltip';
import { Link, useLocation } from '@tanstack/react-router';
import { ProfileMenu } from './profile-menu';
import { ProfileIcon } from '@/components/shared';
import { getLoggedUser } from '@/helper';

export function TopBar() {
  const { pathname } = useLocation();
  const user = getLoggedUser();

  const title = useMemo(() => {
    if (pathname === '/') return 'Dashboard';
    if (pathname === '/services') return 'Services';
    if (pathname === '/add-bill') return 'Bill Entry';
  }, [pathname]);

  return (
    <nav className="flex h-16 items-center gap-3 border-b px-6">
      <h1 className="text-base font-bold">{title}</h1>
      <div className="ml-auto">
        <TooltipContainer label="Entry new bill">
          <Link
            to="/add-bill"
            className="flex size-8 items-center justify-center rounded-full border border-primary text-primary"
          >
            <PlusIcon size={20} />
          </Link>
        </TooltipContainer>
      </div>
      <ProfileMenu trigger={<ProfileIcon name={user?.name as string} />}>
        <h3 className="px-4 text-base font-semibold">{user?.name}</h3>
        <p className="px-4 text-muted-foreground">{user?.email}</p>
        <div className="my-2 border-t" />
      </ProfileMenu>
    </nav>
  );
}
