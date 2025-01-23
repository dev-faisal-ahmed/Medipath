'use client';

import { QK } from '@/api-lib';
import { CONST } from '@/lib/const';
import { IService } from '@/types';
import { getServices } from '@/api-lib/query';
import { DataTable, DataTableAction } from '@/components/ui/data-table';
import { removeEmptyProperty } from '@/helper';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { usePopupState, useTopbarContext } from '@/hooks';
import { useSearchParams } from 'next/navigation';
import { UpdateService } from './update-service';
import { DeleteService } from './delete-service';
import { FullSpaceLoader } from '@/components/ui/loader';

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
  const offset = (page - 1) * limit;

  const column: ColumnDef<IService>[] = [
    { id: 'Serial', header: 'SL.', cell: ({ row }) => <span>{offset + (row.index + 1)}</span> },
    { accessorKey: 'name', header: 'Name' },
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
    { id: 'action', cell: ({ row }) => <ActionDropdown {...row.original} /> },
  ];

  if (isLoading) return <FullSpaceLoader />;
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
