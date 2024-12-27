import { useMemo } from 'react';
import { useAuth } from '@/providers';
import { ProfileIcon } from '@/components/shared/profile-icon';
import { Link, useLocation } from '@tanstack/react-router';
import { ProfileMenu } from './profile-menu';

export function TopBar() {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const title = useMemo(() => {
    if (pathname === '/') return 'Dashboard';
  }, [pathname]);

  return (
    <nav className="flex h-20 items-center gap-3 border-b px-6">
      <h1 className="text-base font-bold">{title}</h1>
      <div className="ml-auto">
        <Link></Link>
        <ProfileMenu trigger={<ProfileIcon name={user?.name as string} />} />
      </div>
    </nav>
  );
}
