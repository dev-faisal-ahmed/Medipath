import Link from 'next/link';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';
import { ISidebarLink } from './use.sidebar-link';

export function SidebarLink({ title, items, icon, isActive, url }: ISidebarLink) {
  if (items)
    return (
      <Collapsible>
        <CollapsibleTrigger className="group w-full px-4">
          <div
            className={cn(
              'flex items-center gap-3 rounded-md border-r border-transparent p-3 duration-300 hover:bg-secondary/30 hover:text-primary',
              isActive && 'bg-primary font-semibold text-white',
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
          <div className="mt-2 pl-8 pr-4">
            <div className="flex flex-col border-l pl-2">
              {items.map((item) => (
                <Link
                  key={item.url}
                  href={item.url}
                  className={cn(
                    'rounded-md p-3 hover:bg-secondary/30 hover:text-primary',
                    item.isActive && 'bg-primary font-semibold text-white',
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
      href={url!}
      className={cn(
        'mx-4 flex items-center gap-3 rounded-md p-3 duration-300 hover:bg-secondary/30 hover:text-primary',
        isActive && 'bg-primary font-semibold text-white',
      )}
    >
      {icon}
      {title}
    </Link>
  );
}
