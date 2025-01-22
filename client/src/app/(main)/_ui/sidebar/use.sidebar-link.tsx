import { ReactNode, useMemo } from 'react';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaXRay, FaUserDoctor } from 'react-icons/fa6';
import { RiBillFill } from 'react-icons/ri';
import { usePathname } from 'next/navigation';

export interface ISidebarLink {
  title: string;
  icon: ReactNode;
  isActive: boolean;
  items?: { title: string; url: string; isActive: boolean }[];
  url?: string;
}

export const useSidebarLinks = () => {
  const pathname = usePathname();

  const sidebarLinks = useMemo(() => {
    const exactMath = (link: string) => pathname === link;
    const partialMatch = (link: string) => pathname.startsWith(link);
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
        isActive: matchList(['/bills', '/bill/add']),
        items: [
          { title: 'Bills', url: '/bills', isActive: exactMath('/bills') },
          { title: 'Bill Entry', url: '/bill/add', isActive: exactMath('/bill/add') },
        ],
      },
      {
        title: 'Referrer',
        url: '/referrers',
        icon: <FaUserDoctor size={20} />,
        isActive: partialMatch('/referrers'),
      },
    ];

    return links;
  }, [pathname]);

  return { sidebarLinks };
};
