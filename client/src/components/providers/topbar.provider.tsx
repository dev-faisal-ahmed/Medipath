'use client';

import { useDebounce } from '@/hooks';
import { createContext, PropsWithChildren, useState, ReactNode, useCallback, useMemo, useEffect } from 'react';

// context
export const TopbarContext = createContext<TTopbarContext | null>(null);

// provider
export const TopbarProvider = ({ children }: PropsWithChildren) => {
  const [headerChild, setHeaderChild] = useState<ReactNode | null>(null);
  const [headerTitle, setHeaderTitle] = useState<ReactNode | string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [isSearchbarShown, setIsSearchbarShown] = useState(false);
  const searchTerm = useDebounce(search);

  const updateHeaderChild = useCallback((child: ReactNode | null) => setHeaderChild(child), []);
  const updateHeaderTitle = useCallback((title: ReactNode | string) => setHeaderTitle(title), []);
  const updateSearch = useCallback((value: string) => setSearch(value), []);
  const updateIsSearchbarShown = useCallback((value: boolean) => setIsSearchbarShown(value), []);

  const contextValue = useMemo(() => {
    return {
      search,
      searchTerm,
      isSearchbarShown,
      headerChild,
      headerTitle,
      updateSearch,
      updateIsSearchbarShown,
      updateHeaderChild,
      updateHeaderTitle,
    };
  }, [
    search,
    searchTerm,
    isSearchbarShown,
    headerChild,
    headerTitle,
    updateSearch,
    updateIsSearchbarShown,
    updateHeaderChild,
    updateHeaderTitle,
  ]);

  useEffect(() => {
    return () => setSearch('');
  }, []);

  return <TopbarContext.Provider value={contextValue}>{children}</TopbarContext.Provider>;
};

// interface
type TTopbarContext = {
  search: string;
  searchTerm: string;
  isSearchbarShown: boolean;
  headerChild: ReactNode | null;
  headerTitle: ReactNode | string;
  updateSearch(value: string): void;
  updateIsSearchbarShown(value: boolean): void;
  updateHeaderChild(child: ReactNode | null): void;
  updateHeaderTitle(title: ReactNode | string): void;
};
