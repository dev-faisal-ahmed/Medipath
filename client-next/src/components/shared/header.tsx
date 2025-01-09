'use client';

import { useTopbarContext } from '@/app/(main)/_components/topbar/topbar';
import { memo, PropsWithChildren, useEffect } from 'react';

export const Header = memo(
  ({ title = 'Medipath', showSearchBar, children }: PropsWithChildren<{ title?: string; showSearchBar?: boolean }>) => {
    const { updateHeaderTitle, updateHeaderChild, resetSearch } = useTopbarContext();

    useEffect(() => {
      if (title) updateHeaderTitle(title);
      if (children) updateHeaderChild(children);

      return () => {
        updateHeaderTitle('');
        updateHeaderChild(null);
        resetSearch();
      };
    }, [title, children, updateHeaderTitle, updateHeaderChild, showSearchBar, resetSearch]);

    return null;
  },
);

Header.displayName = 'Header';
