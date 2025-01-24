'use client';

import Link from 'next/link';

import { TBill } from '@/types';
import { QK } from '@/api-lib';
import { getBills } from '@/api-lib/query';
import { DataTable } from '@/components/ui/data-table';
import { FullSpaceLoader } from '@/components/ui/loader';
import { removeEmptyProperty } from '@/helper';
import { useTopbarContext } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useSearchParams } from 'next/navigation';
import { CONST } from '@/lib/const';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { TakeDue } from './take-due';
import { Badge } from '@/components/ui/badge';

const LIMIT = '20';

export const BillTable = () => {
  const { searchTerm } = useTopbarContext();
  const searchParams = useSearchParams();
  const pageParams = searchParams.get('page') || '1';

  const { data: billData, isLoading } = useQuery({
    queryKey: [QK.BILL, { ...removeEmptyProperty({ searchTerm, page: pageParams, limit: LIMIT }) }],
    queryFn: () => getBills({ searchTerm, page: pageParams, limit: LIMIT }),
  });

  const page = billData?.meta?.page || 1;
  const limit = billData?.meta?.limit || 20;
  const totalPages = billData?.meta?.totalPages || 1;
  const offset = (page - 1) * limit;

  const column: ColumnDef<TBill>[] = [
    { id: 'serial', header: 'SL.', cell: ({ row }) => <span>{offset + row.index + 1}</span> },
    { accessorKey: 'billId', header: 'Bill Id' },
    {
      accessorKey: 'patientInfo.name',
      header: 'Patient Name',
      cell: ({ getValue }) => <span className="font-medium">{getValue<string>()}</span>,
    },
    {
      accessorKey: 'services',
      header: 'Services',
      cell: ({ getValue }) => (
        <div className="flex flex-col gap-2">
          {getValue<TBill['services']>().map((service, index) => (
            <li key={index}>{service.name}</li>
          ))}
        </div>
      ),
    },
    {
      accessorKey: 'paid',
      header: 'Paid',
      cell: ({ getValue }) => (
        <span className="font-medium">
          {CONST.TAKA} {getValue<number>()}
        </span>
      ),
    },
    {
      id: 'due-status',
      header: 'Due',
      cell: ({ row }) => {
        const price = row.original.price || 0;
        const paid = row.original.paid || 0;
        const discount = row.original.discount || 0;
        const due = price - paid - discount;

        if (due > 0)
          return (
            <span className="font-medium">
              {CONST.TAKA} {due}
            </span>
          );

        return <Badge>Paid</Badge>;
      },
    },
    {
      accessorKey: 'date',
      header: () => <div className="text-center">Date</div>,
      cell: ({ getValue }) => <div className="text-center">{format(getValue<string>(), 'dd MMM, yyyy')}</div>,
    },
    {
      id: 'action',
      cell: ({ row }) => {
        const { paid, price, discount, id } = row.original;
        const due = price - (paid || 0) - (discount || 0);

        return (
          <div className="mx-auto flex w-fit flex-col gap-2">
            <Button variant="outline" asChild>
              <Link href={`/bill/${id}`}>View Receipt</Link>
            </Button>
            {due ? <TakeDue billId={id} /> : <Button variant="secondary">Already Paid</Button>}
          </div>
        );
      },
    },
  ];

  if (isLoading) return <FullSpaceLoader />;

  return <DataTable columns={column} data={billData?.data || []} pagination={{ page, totalPages }} />;
};
