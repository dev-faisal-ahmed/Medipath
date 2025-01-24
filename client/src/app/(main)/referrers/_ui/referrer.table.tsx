'use client';

import { QK } from '@/api-lib';
import { TReferrer } from '@/types';
import { getReferrers } from '@/api-lib/query';
import { DataTable, DataTableAction } from '@/components/ui/data-table';
import { usePopupState, useTopbarContext } from '@/hooks';
import { removeEmptyProperty } from '@/helper';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useSearchParams } from 'next/navigation';
import { UpdateReferrer } from './update-referrer';
import { DeleteReferrer } from './delete-referrer';
import { FullSpaceLoader } from '@/components/ui/loader';

const LIMIT = '20';

export const ReferrerTable = () => {
  const { searchTerm } = useTopbarContext();
  const searchParams = useSearchParams();
  const pageParams = searchParams.get('page') || '1';

  const { data: referrerData, isLoading } = useQuery({
    queryKey: [QK.REFERRER, { ...removeEmptyProperty({ searchTerm, page: pageParams, limit: LIMIT }) }],
    queryFn: () => getReferrers({ searchTerm, page: pageParams, limit: LIMIT }),
  });

  const page = referrerData?.meta?.page || 1;
  const limit = referrerData?.meta?.limit || 20;
  const totalPages = referrerData?.meta?.totalPages || 1;
  const offset = (page - 1) * limit;

  const column: ColumnDef<TReferrer>[] = [
    { id: 'serial', header: 'SL.', cell: ({ row }) => <span>{offset + row.index + 1}</span> },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'type', header: 'Type' },
    { accessorKey: 'designation', header: 'Designation' },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ getValue }) => <div className="text-muted-foreground">{getValue<string>() || 'N/A'}</div>,
    },
    { id: 'action', cell: ({ row }) => <ActionDropdown {...row.original} /> },
  ];

  if (isLoading) return <FullSpaceLoader />;
  if (!referrerData?.data) return <div>No Data Found</div>;

  return <DataTable data={referrerData?.data} pagination={{ page, totalPages }} columns={column} />;
};

const ActionDropdown = (referrer: TReferrer) => {
  const { open, onOpenChange } = usePopupState();

  return (
    <DataTableAction open={open} onOpenChange={onOpenChange}>
      <UpdateReferrer referrer={referrer} onActionDropdownChange={onOpenChange} />
      <DeleteReferrer referrerId={referrer.id} onActionDropdownChange={onOpenChange} />
    </DataTableAction>
  );
};
