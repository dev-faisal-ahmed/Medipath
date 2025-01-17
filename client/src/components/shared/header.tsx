'use client';

import { useTopbarContext } from '@/hooks';
import { memo, ReactNode, useEffect } from 'react';

interface IProps {
  title?: string;
  showSearchBar?: boolean;
  children?: ReactNode;
}

export const Header = memo(({ title = 'Medipath', children, showSearchBar = false }: IProps) => {
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
