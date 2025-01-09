'use client';

import Link from 'next/link';

import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useAuth } from '@/hooks';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use.debounce';
import { PlusIcon, SearchIcon, XIcon } from 'lucide-react';
import { ProfileMenu } from '../profile-menu';
import { ProfileIcon } from '@/components/shared/profile-icon';
import { TooltipContainer } from '@/components/ui/tooltip';

// context
const TopbarContext = createContext<ITopbarContext | null>(null);

// hook
export function useTopbarContext() {
  const context = useContext(TopbarContext);
  if (!context) throw new Error('You can not access the context form outside');
  return context;
}

// component
export function Topbar({ children }: PropsWithChildren) {
  const [headerChild, setHeaderChild] = useState<ReactNode | null>(null);
  const [headerTitle, setHeaderTitle] = useState<ReactNode | string | null>(null);
  const [search, setSearch] = useState<string>('');
  const searchTerm = useDebounce(search);

  const { data: session } = useAuth();
  const user = session?.user;

  const updateHeaderChild = useCallback((child: ReactNode | null) => setHeaderChild(child), []);
  const updateHeaderTitle = useCallback((title: ReactNode | string) => setHeaderTitle(title), []);
  const resetSearch = useCallback(() => setSearch(''), []);

  const contextValue = useMemo(() => {
    return { searchTerm, updateHeaderChild, updateHeaderTitle, resetSearch };
  }, [searchTerm, updateHeaderChild, updateHeaderTitle, resetSearch]);

  useEffect(() => {
    return setSearch('');
  }, []);

  return (
    <TopbarContext.Provider value={contextValue}>
      <nav className="flex items-center gap-3 p-6">
        {headerTitle ? (
          <> {typeof headerTitle === 'string' ? <h1 className="text-base font-bold">{headerTitle}</h1> : headerTitle}</>
        ) : (
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
        )}

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
      {children}
    </TopbarContext.Provider>
  );
}

// interface
interface ITopbarContext {
  searchTerm: string;
  updateHeaderChild(child: ReactNode | null): void;
  updateHeaderTitle(title: ReactNode | string): void;
  resetSearch(): void;
}
