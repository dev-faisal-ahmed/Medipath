'use client';

import { QK } from '@/api-lib';
import { CONST } from '@/lib/const';
import { TService } from '@/types';
import { getServices } from '@/api-lib/query';
import { DataTable, DataTableAction } from '@/components/ui/data-table';
import { removeEmptyProperty } from '@/helper';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { usePopupState } from '@/hooks';
import { useSearchParams } from 'next/navigation';
import { UpdateService } from './update-service';
import { DeleteService } from './delete-service';
import { TableLoader } from '@/components/ui/loader';
import { useTopbarStore } from '@/stores/topbar';

const LIMIT = '10';

export const ServicesTable = () => {
  const searchTerm = useTopbarStore((state) => state.searchTerm);
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

  const column: ColumnDef<TService>[] = [
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

  if (isLoading) return <TableLoader length={10} className="p-6" />;
  if (!servicesData) return <div> No Data Found</div>;

  return (
    <section className="my-6 px-6">
      <DataTable data={servicesData.data} pagination={{ page, totalPages }} columns={column} />
    </section>
  );
};

const ActionDropdown = (service: TService) => {
  const { open, onOpenChange } = usePopupState();

  return (
    <DataTableAction open={open} onOpenChange={onOpenChange}>
      <UpdateService service={service} onActionDropdownChange={onOpenChange} />
      <DeleteService serviceId={service.id} onActionDropdownChange={onOpenChange} />
    </DataTableAction>
  );
};
