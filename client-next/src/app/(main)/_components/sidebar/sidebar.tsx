'use client';

import Link from 'next/link';
import { useSidebarLinks } from './use.sidebar-link';
import { AppLogo } from '../app-logo';
import { ProfileMenu } from '../profile-menu';
import { SidebarLink } from './sidebar-link';

export function Sidebar() {
  const { sidebarLinks } = useSidebarLinks();

  return (
    <aside className="hidden min-h-screen flex-col py-4 md:flex">
      <Link href="/">
        <AppLogo className="mx-4 pt-2" />
      </Link>
      <div className="mt-20 flex grow flex-col gap-2">
        {sidebarLinks.map((link, index) => (
          <SidebarLink key={index} {...link} />
        ))}
      </div>

      <div className="mx-4 grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-md bg-secondary/20 p-4">
        <div>{/* <ProfileIcon name={user?.name as string} /> */}</div>
        <div>
          {/* <h3 className="line-clamp-1 font-bold">{user?.name as string}</h3> */}
          {/* <p className="text-xs text-muted-foreground">{user?.role}</p> */}
        </div>
        <div>
          <ProfileMenu />
        </div>
      </div>
    </aside>
  );
}
