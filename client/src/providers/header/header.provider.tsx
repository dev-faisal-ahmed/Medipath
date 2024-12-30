import { memo, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { ProfileMenu } from '@/components/layout/main/profile-menu';
import { ProfileIcon } from '@/components/shared';
import { TooltipContainer } from '@/components/ui/tooltip';
import { HeaderContext, useHeaderContext } from './header.context';
import { getLoggedUser } from '@/helper';
import { Link } from '@tanstack/react-router';
import { ReactNode } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function HeaderProvider({ children }: PropsWithChildren) {
  const [headerChild, setHeaderChild] = useState<ReactNode | null>();
  const [headerTitle, setHeaderTitle] = useState<ReactNode | string>('');
  const user = getLoggedUser();

  const updateHeaderChild = useCallback((child: ReactNode | null) => setHeaderChild(child), []);
  const updateHeaderTitle = useCallback((title: ReactNode | string) => setHeaderTitle(title), []);

  const contextValue = useMemo(
    () => ({ updateHeaderChild, updateHeaderTitle }),
    [updateHeaderChild, updateHeaderTitle],
  );

  return (
    <HeaderContext.Provider value={contextValue}>
      <nav className="flex h-16 items-center gap-3 px-6">
        {typeof headerTitle === 'string' ? <h1 className="text-base font-bold">{headerTitle}</h1> : headerTitle}
        <div className="ml-auto">
          <TooltipContainer label="Entry new bill">
            <Link
              to="/add-bill"
              className="flex size-9 items-center justify-center rounded-md border border-primary text-primary"
            >
              <PlusIcon size={20} />
            </Link>
          </TooltipContainer>
        </div>
        {headerChild}
        <ProfileMenu trigger={<ProfileIcon name={user?.name as string} />}>
          <h3 className="px-4 text-base font-semibold">{user?.name}</h3>
          <p className="px-4 text-muted-foreground">{user?.email}</p>
          <div className="my-2 border-t" />
        </ProfileMenu>
      </nav>
      <main className="mt-2 h-[calc(100vh-64px)]">
        <ScrollArea className="h-full">{children}</ScrollArea>
      </main>
    </HeaderContext.Provider>
  );
}

export const Header = memo(({ title = 'Medipath', children }: PropsWithChildren<{ title: string }>) => {
  const { updateHeaderTitle, updateHeaderChild } = useHeaderContext();

  useEffect(() => {
    updateHeaderTitle(title);
    updateHeaderChild(children);

    return () => {
      updateHeaderTitle('');
      updateHeaderChild(null);
    };
  }, [title, children, updateHeaderTitle, updateHeaderChild]);

  return null;
});
