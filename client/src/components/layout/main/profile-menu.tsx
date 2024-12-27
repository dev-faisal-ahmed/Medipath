import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EllipsisIcon } from 'lucide-react';

export function ProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisIcon />
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
