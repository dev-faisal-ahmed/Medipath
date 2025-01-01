import { QUERY_KEYS } from '@/api';
import { getReferrers } from '@/api/query';
import { DataTable } from '@/components/ui/data-table';
import { IReferrer, REFERRER_TYPE } from '@/lib/types';
import { useHeaderContext } from '@/providers';
import { useQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

type IProps = {
  referrerType: REFERRER_TYPE;
};

const agentRouteApi = getRouteApi('/_private/referrer/agents');
const doctorRouteApi = getRouteApi('/_private/referrer/doctors');

export function ReferrerTable({ referrerType }: IProps) {
  const params = referrerType === REFERRER_TYPE.AGENT ? agentRouteApi.useSearch() : doctorRouteApi.useSearch();
  const { searchTerm } = useHeaderContext();

  const { data: referrerData, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.REFERRERS, { referrerType, searchTerm }],
    queryFn: () => getReferrers({ ...params, type: referrerType, searchTerm }),
  });

  const page = referrerData?.meta?.page || 1;
  const limit = referrerData?.meta?.limit || 20;
  const totalPages = referrerData?.meta?.totalPages || 1;

  const column = useMemo<ColumnDef<IReferrer>[]>(() => {
    const offset = (page - 1) * limit;
    return [
      { id: 'serial', header: 'SL.', cell: ({ row }) => <span>{offset + row.index + 1}</span> },
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'designation', header: 'Designation' },
      {
        accessorKey: 'phone',
        header: 'Phone',
        cell: ({ getValue }) => <div className="text-muted-foreground">{getValue<string>() || 'N/A'}</div>,
      },
    ];
  }, [page, limit]);

  if (isLoading) return <div>Loading...</div>;
  if (!referrerData?.data) return <div>No Data Found</div>;

  return (
    <section className="h-full w-full p-6">
      <DataTable data={referrerData?.data} pagination={{ page, totalPages }} columns={column} />
    </section>
  );
}
