'use client';

import { TOverview } from '@/api-lib/query';
import { Badge } from '@/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';
import { formatDate } from '@/helper';
import { CONST } from '@/lib/const';
import { TBill } from '@/types';

export const RecentBills = ({ bills }: TRecentBillsProps) => {
  const column: ColumnDef<TOverview['bills'][number]>[] = [
    { id: 'serial', header: 'SL.', cell: ({ row }) => <span>{row.index + 1}</span> },
    { accessorKey: 'billId', header: 'Bill Id' },
    {
      id: 'patientInfo',
      header: 'Patient Name',
      cell: ({ row }) => (
        <div className="whitespace-nowrap font-semibold">
          <h2>{row.original.patientInfo.name}</h2>
          <p className="mt-1 text-xs font-semibold text-muted-foreground">Age : {row.original.patientInfo.age}</p>
        </div>
      ),
    },
    {
      id: 'Ref',
      header: 'Ref',
      cell: ({ row }) => {
        const agent = row.original.agent;
        const doctor = row.original.doctor;

        if (!agent && !doctor) return <p className="font-semibold">N/A</p>;

        return (
          <div>
            {doctor && (
              <div className="flex flex-col gap-1">
                <p>
                  Visited By : <span className="font-bold">{doctor.name}</span>
                </p>
                {doctor.designation && <p className="text-sm text-muted-foreground">{doctor.designation}</p>}
              </div>
            )}

            {agent && (
              <div className="flex flex-col gap-1">
                <p>
                  Referred By : <span className="font-bold">{agent.name}</span>
                </p>
                {agent.designation && <p className="text-sm text-muted-foreground">{agent.designation}</p>}
              </div>
            )}
          </div>
        );
      },
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
      accessorKey: 'createdAt',
      header: () => <span>Date</span>,
      cell: ({ getValue }) => <span>{formatDate({ date: getValue<string>() })}</span>,
    },
  ];

  return (
    <div className="">
      <DataTable columns={column} data={bills} />
    </div>
  );
};

type TRecentBillsProps = {
  bills: TOverview['bills'];
};
