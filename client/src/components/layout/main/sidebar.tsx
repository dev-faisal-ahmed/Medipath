import { cn } from '@/lib/utils';
import { AppLogo } from './app-logo';
import { ProfileIcon } from '@/components/shared';
import { ISidebarLink, useSidebarLinks } from './use-sidebar-links';
import { Link } from '@tanstack/react-router';
import { ProfileMenu } from './profile-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDownIcon } from 'lucide-react';
import { getLoggedUser } from '@/helper';

export function Sidebar() {
  const { sidebarLinks } = useSidebarLinks();
  const user = getLoggedUser();

  return (
    <aside className="hidden min-h-screen flex-col border-r bg-card py-4 md:flex">
      <AppLogo className="mx-4 pt-2" />
      <div className="mt-8 flex grow flex-col">
        {sidebarLinks.map((link, index) => (
          <SidebarLink key={index} {...link} />
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

function SidebarLink({ title, items, icon, isActive, url }: ISidebarLink) {
  if (items)
    return (
      <Collapsible>
        <CollapsibleTrigger className="group w-full px-4">
          <div
            className={cn(
              'flex items-center gap-3 rounded-md border-r border-transparent px-2 py-2 duration-300 hover:bg-primary hover:text-white',
              isActive && 'bg-primary/10 font-semibold text-primary',
            )}
          >
            {icon}
            <h2 className="text-sm">{title}</h2>
            <span className="ml-auto group-data-[state=open]:rotate-180">
              <ChevronDownIcon size={18} />
            </span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="pl-8 pr-4">
            <div className="flex flex-col border-l pl-2">
              {items.map((item) => (
                <Link
                  key={item.url}
                  to={item.url}
                  className={cn(
                    'rounded-md px-2 py-2 hover:bg-primary hover:text-white',
                    item.isActive && 'bg-primary/10 font-semibold text-primary',
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );

  return (
    <Link
      to={url}
      className={cn(
        'mx-4 flex items-center gap-3 rounded-md px-2 py-2 duration-300 hover:bg-primary hover:text-white',
        isActive && 'bg-primary/10 font-semibold text-primary',
      )}
    >
      {icon}
      {title}
    </Link>
  );
}
