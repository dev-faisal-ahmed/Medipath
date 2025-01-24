'use client';

import { useTopbarContext } from '@/hooks';
import { memo, ReactNode, useEffect } from 'react';

export const Header = memo(({ title = 'Medipath', children, showSearchBar = false }: THeaderProps) => {
  const { updateHeaderTitle, updateHeaderChild, updateSearch, updateIsSearchbarShown } = useTopbarContext();

  useEffect(() => {
    if (title) updateHeaderTitle(title);
    if (children) updateHeaderChild(children);
    updateIsSearchbarShown(showSearchBar);

    return () => {
      updateHeaderTitle('');
      updateHeaderChild(null);
      updateIsSearchbarShown(false);
      updateSearch('');
    };
  }, [title, children, updateHeaderTitle, updateHeaderChild, updateIsSearchbarShown, showSearchBar, updateSearch]);

  return null;
});

Header.displayName = 'Header';

// type
type THeaderProps = { title?: string; showSearchBar?: boolean; children?: ReactNode };
