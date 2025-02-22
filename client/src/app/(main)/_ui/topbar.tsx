'use client';

import Link from 'next/link';

import { useAuth, usePopupState } from '@/hooks';
import { SearchInput } from '@/components/ui/input';
import { MenuIcon, PlusIcon } from 'lucide-react';
import { ProfileMenu } from './profile-menu';
import { ProfileIcon } from '@/components/shared';
import { TooltipContainer } from '@/components/ui/tooltip';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useTopbarStore } from '@/stores/topbar';
import { Sidebar } from './sidebar';

export const Topbar = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const isSearchbarShown = useTopbarStore((state) => state.isSearchbarShown);
  const headerTitle = useTopbarStore((state) => state.headerTitle);
  const headerChild = useTopbarStore((state) => state.headerChild);
  const search = useTopbarStore((state) => state.search);
  const updateSearch = useTopbarStore((state) => state.updateSearch);

  const user = useAuth();

  return (
    <nav className="sticky top-0 z-20 flex items-center gap-3 border-b p-6">
      <div className="flex items-center gap-3">
        <button className="rounded-full border p-2 shadow" onClick={() => onOpenChange(!open)}>
          <MenuIcon />
        </button>

        <MobileSidebar />
        {isSearchbarShown ? (
          <SearchInput
            value={search}
            onChange={(search) => updateSearch(search)}
            className={{ container: 'w-full max-w-96' }}
          />
        ) : (
          <h1 className="text-xl font-bold">{headerTitle}</h1>
        )}
      </div>

      <div className="ml-auto flex items-center gap-4">
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
        {/* <ModeSwitcher /> */}
      </div>
    </nav>
  );
};

// const ModeSwitcher = () => {
//   const mode = useTopbarStore((state) => state.mode);
//   const updateMode = useTopbarStore((state) => state.updateMode);

//   return (
//     <CommonSelect
//       className={{ trigger: 'flex h-input w-32 gap-3' }}
//       placeholder="Select mode"
//       onSelectChange={updateMode}
//       selected={mode}
//       options={[
//         { label: 'Pathology', value: MODE.PATHOLOGY },
//         { label: 'Clinic', value: MODE.CLINIC },
//       ]}
//     />
//   );
// };

const MobileSidebar = () => {
  const { open, onOpenChange } = usePopupState();

  return (
    <>
      <button className="md:hidden" onClick={() => onOpenChange(true)}>
        <MenuIcon size={24} />
      </button>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="p-0" side="left">
          <Sidebar className="flex border-0 md:hidden" />
        </SheetContent>
      </Sheet>
    </>
  );
};
