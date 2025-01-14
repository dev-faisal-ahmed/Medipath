'use client';

import { CommonDropdownMenu, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { QUERY_KEYS } from '@/api-lib';
import { getServices } from '@/api-lib/query';
import { DataTable } from '@/components/ui/data-table';
import { removeEmptyProperty } from '@/helper';
import { IService } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { EllipsisIcon } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { useTopbarContext } from '@/hooks';
import { useSearchParams } from 'next/navigation';

const LIMIT = '20';

export function ServicesTable() {
  const { searchTerm } = useTopbarContext();
  const searchParams = useSearchParams();
  const pageParams = searchParams.get('page') || '1';

  const { data: servicesData, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.SERVICE, { ...removeEmptyProperty({ searchTerm, limit: LIMIT, pageParams }) }],
    queryFn: () => getServices({ searchTerm, limit: LIMIT, page: pageParams }),
  });

  const page = servicesData?.meta?.page || 1;
  const limit = servicesData?.meta?.limit || 20;
  const totalPages = servicesData?.meta?.totalPages || 1;

  const column = useMemo<ColumnDef<IService>[]>(() => {
    const offset = (page - 1) * limit;
    return [
      {
        id: 'Serial',
        header: 'SL.',
        cell: ({ row }) => <span>{offset + (row.index + 1)}</span>,
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'price',
        header: () => <div className="text-center">Price</div>,
        cell: ({ getValue }) => <div className="text-center">{getValue<number>()}</div>,
      },
      {
        accessorKey: 'roomNo',
        header: () => <div className="text-center">Room No</div>,
        cell: ({ getValue }) => <div className="text-center">{getValue<string>()}</div>,
      },
      {
        id: 'action',
        cell: ({ row }) => <ActionDrawer {...row.original} />,
      },
    ];
  }, [limit, page]);

  if (isLoading) return <div>Loading....</div>;
  if (!servicesData) return <div> No Data Found</div>;

  return (
    <section className="h-full w-full p-6">
      <DataTable data={servicesData.data} pagination={{ page, totalPages }} columns={column} />
    </section>
  );
}

function ActionDrawer(service: IService) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return (
    <CommonDropdownMenu
      control={{ isOpen: isDrawerOpen, setIsOpen: setIsDrawerOpen }}
      trigger={<EllipsisIcon size={18} />}
    >
      <DropdownMenuLabel className="p-2 text-center">Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <div className="flex flex-col gap-2 p-2">
        {/* <DeleteService serviceId={service._id} closeDrawer={closeDrawer} /> */}
        {/* <UpdateService payload={service} closeDrawer={closeDrawer} /> */}
      </div>
    </CommonDropdownMenu>
  );
}
