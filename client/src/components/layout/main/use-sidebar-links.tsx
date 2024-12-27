import { ReactNode, useMemo } from 'react';
import { useLocation } from '@tanstack/react-router';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaXRay } from 'react-icons/fa6';
import { RiBillFill } from 'react-icons/ri';

export interface ISidebarLink {
  title: string;
  icon: ReactNode;
  isActive: boolean;
  items?: { title: string; url: string; isActive: boolean }[];
  url?: string;
}

export function useSidebarLinks() {
  const { pathname } = useLocation();

  const sidebarLinks = useMemo(() => {
    const exactMath = (link: string) => pathname === link;
    // const partialMatch = (link: string) => pathname.startsWith(link);
    const matchList = (links: string[]) => links.includes(pathname);

    const links: ISidebarLink[] = [
      { title: 'Dashboard', url: '/', icon: <MdSpaceDashboard size={20} />, isActive: exactMath('/') },
      {
        title: 'Service',
        url: '/services',
        icon: <FaXRay size={20} />,
        isActive: exactMath('/services'),
      },
      {
        title: 'Bill',
        icon: <RiBillFill size={20} />,
        isActive: matchList(['/bills', '/add-bill']),
        items: [
          { title: 'Bills', url: '/bills', isActive: exactMath('/bills') },
          { title: 'Bill Entry', url: '/add-bill', isActive: exactMath('/add-bill') },
        ],
      },
    ];

    return links;
  }, [pathname]);

  return { sidebarLinks };
}
