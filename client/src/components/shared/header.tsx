'use client';

import { useTopbarStore } from '@/stores/topbar.store';
import { memo, ReactNode, useEffect } from 'react';

export const Header = memo(({ title = 'Medipath', children, showSearchBar = false }: THeaderProps) => {
  const updateHeaderTitle = useTopbarStore((state) => state.updateHeaderTitle);
  const updateHeaderChild = useTopbarStore((state) => state.updateHeaderChild);
  const updateIsSearchbarShown = useTopbarStore((state) => state.updateIsSearchbarShown);
  const updateSearch = useTopbarStore((state) => state.updateSearch);

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
