'use client';

import { QK } from '@/api-lib';
import { getServices } from '@/api-lib/query';
import { DataTable, DataTableAction } from '@/components/ui/data-table';
import { removeEmptyProperty } from '@/helper';
import { IService } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { usePopupState, useTopbarContext } from '@/hooks';
import { useSearchParams } from 'next/navigation';
import { UpdateService } from './update-service';
import { DeleteService } from './delete-service';
import { CONST } from '@/lib/const';

const LIMIT = '15';

export const ServicesTable = () => {
  const { searchTerm } = useTopbarContext();
  const searchParams = useSearchParams();
  const pageParams = searchParams.get('page') || '1';

  const { data: servicesData, isLoading } = useQuery({
    queryKey: [QK.SERVICE, { ...removeEmptyProperty({ searchTerm, limit: LIMIT, page: pageParams }) }],
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
        cell: ({ getValue }) => (
          <div className="text-center">
            {getValue<number>()} {CONST.TAKA}
          </div>
        ),
      },
      {
        accessorKey: 'roomNo',
        header: () => <div className="text-center">Room No</div>,
        cell: ({ getValue }) => <div className="text-center">{getValue<string>()}</div>,
      },
      {
        id: 'action',
        cell: ({ row }) => <ActionDropdown {...row.original} />,
      },
    ];
  }, [limit, page]);

  if (isLoading) return <div>Loading....</div>;
  if (!servicesData) return <div> No Data Found</div>;

  return <DataTable data={servicesData.data} pagination={{ page, totalPages }} columns={column} />;
};

const ActionDropdown = (service: IService) => {
  const { open, onOpenChange } = usePopupState();

  return (
    <DataTableAction open={open} onOpenChange={onOpenChange}>
      <UpdateService service={service} onActionDropdownChange={onOpenChange} />
      <DeleteService serviceId={service._id} onActionDropdownChange={onOpenChange} />
    </DataTableAction>
  );
};
