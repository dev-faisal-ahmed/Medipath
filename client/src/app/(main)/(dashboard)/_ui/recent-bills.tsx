'use client';

import { TOverview } from '@/api-lib/query';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { formatDate } from '@/helper';
import { CONST } from '@/lib/const';
import { TBill } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const RecentBills = ({ bills }: TRecentBillsProps) => {
  const column: ColumnDef<TOverview['bills'][number]>[] = [
    { id: 'serial', header: 'SL.', cell: ({ row }) => <span>{row.index + 1}</span> },
    {
      accessorKey: 'billId',
      header: 'Bill Id',
    },
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
      header: () => <span>Date</span>,
      cell: ({ getValue }) => <span>{formatDate(getValue<string>())}</span>,
    },
  ];

  return <DataTable columns={column} data={bills} />;
};

type TRecentBillsProps = {
  bills: TOverview['bills'];
};
