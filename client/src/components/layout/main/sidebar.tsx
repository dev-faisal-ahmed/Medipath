import { cn } from '@/lib/utils';
import { AppLogo } from './app-logo';
import { ProfileIcon } from '@/components/shared/profile-icon';
import { useSidebarLinks } from './use-sidebar-links';
import { Link } from '@tanstack/react-router';
import { ProfileMenu } from './profile-menu';
import { useAuth } from '@/providers';

export function Sidebar() {
  const { sidebarLinks } = useSidebarLinks();
  const { user } = useAuth();

  return (
    <aside className="hidden min-h-screen flex-col border-r bg-card py-4 md:flex">
      <AppLogo className="mx-4 pt-2" />
      <div className="mt-8 flex grow flex-col gap-3">
        {sidebarLinks.map(({ url, title, icon, isActive }) => (
          <Link
            key={url}
            href={url}
            className={cn(
              'flex items-center gap-3 border-r-[3px] border-transparent px-4 py-1 text-base duration-300 hover:bg-primary hover:text-white',
              isActive && 'border-primary font-semibold text-primary',
            )}
          >
            {icon}
            {title}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t-2 px-4 pt-4">
        <div>
          <ProfileIcon name={user?.name as string} />
        </div>
        <div>
          <h3 className="line-clamp-1 font-bold">{user?.name as string}</h3>
          <p className="text-xs text-muted-foreground">{user?.role}</p>
        </div>
        <div>
          <ProfileMenu />
        </div>
      </div>
    </aside>
  );
}
