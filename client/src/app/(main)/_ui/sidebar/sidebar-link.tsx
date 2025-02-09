'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { TSidebarLink } from './use.sidebar-link';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export const SidebarLink = ({ title, items, icon, isActive, url }: TSidebarLink) => {
  if (items)
    return (
      <Collapsible>
        <CollapsibleTrigger className="group w-full px-4">
          <div
            className={cn(
              'flex items-center gap-3 rounded-md border-r border-transparent p-2 duration-300 hover:bg-secondary/30 hover:text-primary',
              isActive && 'bg-secondary/30 font-semibold text-primary',
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
          <div className="mt-1 pl-8">
            <div className="flex flex-col gap-1 border-l pl-2">
              {items.map((item) => (
                <ActiveLink key={item.url} {...item} />
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );

  return <ActiveLink title={title} url={url!} icon={icon} isActive={isActive} />;
};

const ActiveLink = ({ url, title, isActive, className, icon }: TActiveLinkProps) => {
  return (
    <Link
      href={url!}
      className={cn(
        'mx-4 flex items-center gap-3 rounded-md p-2 duration-300 hover:bg-secondary/30 hover:text-primary',
        className,
        isActive && 'bg-secondary/30 font-semibold text-primary',
      )}
    >
      {icon}
      {title}
    </Link>
  );
};

// types
type TActiveLinkProps = { url: string; title: string; className?: string; isActive?: boolean; icon?: ReactNode };
