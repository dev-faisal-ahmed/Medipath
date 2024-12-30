import { QUERY_KEYS } from '@/api';
import { getServices } from '@/api/query';
import { DataTable } from '@/components/ui/data-table';
import { removeEmptyProperty } from '@/helper';
import { IService } from '@/lib/types';
import { useHeaderContext } from '@/providers/header/header.context';
import { useQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

const routeApi = getRouteApi('/_private/services');

export function ServicesTable() {
  const params = routeApi.useSearch();
  const { searchTerm } = useHeaderContext();

  const {
    data: servicesData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [QUERY_KEYS.SERVICES, { ...removeEmptyProperty({ ...params, searchTerm }) }],
    queryFn: () => getServices({ ...params, name: searchTerm }),
    staleTime: Infinity,
  });

  const page = servicesData?.meta?.page || 1;
  const limit = servicesData?.meta?.limit || 20;
  const totalPages = servicesData?.meta?.totalPages || 1;

  const column = useMemo<ColumnDef<IService>[]>(() => {
    return [
      {
        id: 'Serial',
        header: 'SL.',
        cell: ({ row }) => <span>{(page - 1) * limit + (row.index + 1)}</span>,
        meta: { noStretch: true },
      },
      { accessorKey: 'name', header: 'Name' },
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
    ];
  }, [limit, page]);

  if (isLoading || isFetching) return <div>Loading....</div>;
  if (!servicesData) return <div> No Data Found</div>;

  return (
    <section className="h-full w-full p-6">
      <DataTable data={servicesData.data} pagination={{ page, totalPages }} columns={column} />
    </section>
  );
}
