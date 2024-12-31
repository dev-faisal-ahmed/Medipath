import { memo, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { ProfileMenu } from '@/components/layout/main/profile-menu';
import { ProfileIcon } from '@/components/shared';
import { TooltipContainer } from '@/components/ui/tooltip';
import { HeaderContext, useHeaderContext } from './header.context';
import { getLoggedUser } from '@/helper';
import { Link } from '@tanstack/react-router';
import { ReactNode } from '@tanstack/react-router';
import { PlusIcon, SearchIcon, XIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDebounce } from '@/hooks/use-debounce';
import { Input } from '@/components/ui/input';

export function HeaderProvider({ children }: PropsWithChildren) {
  const [headerChild, setHeaderChild] = useState<ReactNode | null>();
  const [headerTitle, setHeaderTitle] = useState<ReactNode | string>('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setSearch] = useState('');
  const searchTerm = useDebounce(search);

  const user = getLoggedUser();

  const updateHeaderChild = useCallback((child: ReactNode | null) => setHeaderChild(child), []);
  const updateHeaderTitle = useCallback((title: ReactNode | string) => setHeaderTitle(title), []);
  const updateShowSearchBar = useCallback((show: boolean) => setShowSearchBar(show), []);

  const contextValue = useMemo(
    () => ({ updateHeaderChild, updateHeaderTitle, searchTerm, updateShowSearchBar }),
    [updateHeaderChild, updateHeaderTitle, searchTerm, updateShowSearchBar],
  );

  return (
    <HeaderContext.Provider value={contextValue}>
      <nav className="flex items-center gap-3 p-6">
        {showSearchBar ? (
          <div className="relative w-full max-w-96">
            <SearchIcon className="absolute left-2 top-1/2 size-5 -translate-y-1/2 text-primary" />
            <Input
              className="w-full border-secondary pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search here..."
            />
            {search && (
              <XIcon
                onClick={() => setSearch('')}
                className="absolute right-2 top-1/2 size-5 -translate-y-1/2 cursor-pointer text-primary"
              />
            )}
          </div>
        ) : (
          <>{typeof headerTitle === 'string' ? <h1 className="text-base font-bold">{headerTitle}</h1> : headerTitle}</>
        )}

        <div className="ml-auto"></div>

        <TooltipContainer label="Entry new bill">
          <Link
            to="/add-bill"
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
      {/* <main className="mt-2 h-[calc(100vh-64px)]"> */}
      <ScrollArea className="h-full">{children}</ScrollArea>
      {/* </main> */}
    </HeaderContext.Provider>
  );
}

export const Header = memo(
  ({ title = 'Medipath', showSearchBar, children }: PropsWithChildren<{ title?: string; showSearchBar?: boolean }>) => {
    const { updateHeaderTitle, updateShowSearchBar, updateHeaderChild } = useHeaderContext();

    useEffect(() => {
      if (title) updateHeaderTitle(title);
      updateShowSearchBar(!!showSearchBar);
      updateHeaderChild(children);

      return () => {
        updateHeaderTitle('');
        updateHeaderChild(null);
        updateShowSearchBar(false);
      };
    }, [title, children, updateHeaderTitle, updateHeaderChild, updateShowSearchBar, showSearchBar]);

    return null;
  },
);
