import { useLocation } from '@tanstack/react-router';
import { LayoutDashboardIcon, TestTubeDiagonalIcon } from 'lucide-react';
import { useMemo } from 'react';

export function useSidebarLinks() {
  const { pathname } = useLocation();

  const sidebarLinks = useMemo(() => {
    const isActive = (url: string) => pathname === url;

    return [
      { url: '/', title: 'Dashboard', icon: <LayoutDashboardIcon size={16} />, isActive: isActive('/') },
      { url: '/services', title: 'Services', icon: <TestTubeDiagonalIcon size={16} /> },
    ];
  }, [pathname]);

  return { sidebarLinks };
}
