'use client';

import Link from 'next/link';

import { useAuth } from '@/hooks';
import { Input } from '@/components/ui/input';
import { PlusIcon, SearchIcon, XIcon } from 'lucide-react';
import { ProfileMenu } from './profile-menu';
import { ProfileIcon } from '@/components/shared';
import { TooltipContainer } from '@/components/ui/tooltip';
import { useTopbarContext } from '@/hooks';

export const Topbar = () => {
  const { isSearchbarShown, headerTitle, headerChild, updateSearch, search } = useTopbarContext();

  const { data: session } = useAuth();
  const user = session?.user;

  return (
    <>
      <nav className="sticky top-0 z-20 flex items-center gap-3 border-b bg-background p-6">
        <>
          {isSearchbarShown ? (
            <div className="relative w-full max-w-96">
              <SearchIcon className="absolute left-2 top-1/2 size-5 -translate-y-1/2 text-primary" />
              <Input
                className="w-full border-secondary pl-10"
                value={search}
                onChange={(e) => updateSearch(e.target.value)}
                placeholder="Search here..."
              />
              {search && (
                <XIcon
                  onClick={() => updateSearch('')}
                  className="absolute right-2 top-1/2 size-5 -translate-y-1/2 cursor-pointer text-primary"
                />
              )}
            </div>
          ) : (
            <>
              {typeof headerTitle === 'string' ? <h1 className="text-base font-bold">{headerTitle}</h1> : headerTitle}
            </>
          )}
        </>

        <div className="ml-auto" />

        <TooltipContainer label="Entry new bill">
          <Link
            href="/bill/add"
            className="flex size-9 items-center justify-center rounded-md border border-primary text-primary"
          >
            <PlusIcon size={20} />
          </Link>
        </TooltipContainer>

        {headerChild}

        <ProfileMenu trigger={<ProfileIcon name={user?.name as string} />}>
          <h3 className="px-4 text-base font-semibold">{user?.name}</h3>
          <p className="px-4 text-muted-foreground">{user?.email}</p>
          <div className="my-2 border-t" />
        </ProfileMenu>
      </nav>
    </>
  );
};
