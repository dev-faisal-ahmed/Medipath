'use client';

import { QK } from '@/api-lib';
import { getReferrers, TGetReferrersQueryResponse } from '@/api-lib/query';
import { DataTable, DataTableAction } from '@/components/ui/data-table';
import { usePopupState } from '@/hooks';
import { removeEmptyProperty } from '@/helper';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useSearchParams } from 'next/navigation';
import { UpdateReferrer } from './update-referrer';
import { DeleteReferrer } from './delete-referrer';
import { FullSpaceLoader } from '@/components/ui/loader';
import { useTopbarStore } from '@/stores/topbar';
import { CONST } from '@/lib/const';
import { Badge } from '@/components/ui/badge';

const LIMIT = '15';

export const ReferrerTable = () => {
  const searchTerm = useTopbarStore((state) => state.searchTerm);
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

  const column: ColumnDef<TGetReferrersQueryResponse>[] = [
    { id: 'serial', header: 'SL.', cell: ({ row }) => <span>{offset + row.index + 1}</span> },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'type', header: 'Type' },
    {
      accessorKey: 'designation',
      header: 'Designation',
      cell: ({ getValue }) => <span>{getValue<string>() || <Badge variant="outline"> N/A</Badge>}</span>,
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ getValue }) => (
        <div className="text-muted-foreground">{getValue<string>() || <Badge variant="outline">N/A</Badge>}</div>
      ),
    },
    {
      id: 'due',
      header: 'Due',
      cell: ({ row }) => {
        const { visit, referrer, paid } = row.original;
        const due = visit + referrer - paid;

        if (!due) return <Badge>No Due</Badge>;

        return (
          <span>
            {CONST.TAKA} {due}
          </span>
        );
      },
    },
    { id: 'action', cell: ({ row }) => <ActionDropdown {...row.original} /> },
  ];

  if (isLoading) return <FullSpaceLoader />;
  if (!referrerData?.data) return <div>No Data Found</div>;

  return (
    <div className="my-6 px-6">
      <DataTable data={referrerData?.data} pagination={{ page, totalPages }} columns={column} />
    </div>
  );
};

const ActionDropdown = (referrer: TGetReferrersQueryResponse) => {
  const { open, onOpenChange } = usePopupState();

  return (
    <DataTableAction open={open} onOpenChange={onOpenChange}>
      <UpdateReferrer referrer={referrer} onActionDropdownChange={onOpenChange} />
      <DeleteReferrer referrerId={referrer.id} onActionDropdownChange={onOpenChange} />
    </DataTableAction>
  );
};
