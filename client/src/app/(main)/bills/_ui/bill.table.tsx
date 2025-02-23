'use client';

import { TBill } from '@/types';
import { QK } from '@/api-lib';
import { CONST } from '@/lib/const';
import { Badge } from '@/components/ui/badge';
import { getBills, TGetBillsResponse } from '@/api-lib/query';
import { DataTable } from '@/components/ui/data-table';
import { TableLoader } from '@/components/ui/loader';
import { formatDate, removeEmptyProperty } from '@/helper';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useSearchParams } from 'next/navigation';
import { useTopbarStore } from '@/stores/topbar.store';
import { MdError } from 'react-icons/md';
import { BillTableAction } from './bill-table.action';
import { useDebounce } from '@/hooks';

const LIMIT = '10';

// main component
export const BillTable = () => {
  const search = useTopbarStore((state) => state.search);
  const searchParams = useSearchParams();
  const pageParams = searchParams.get('page') || '1';
  const searchTerm = useDebounce(search);

  const { data: billData, isLoading } = useQuery({
    queryKey: [QK.BILL, { ...removeEmptyProperty({ searchTerm, page: pageParams, limit: LIMIT }) }],
    queryFn: () => getBills({ searchTerm, page: pageParams, limit: LIMIT }),
  });

  const page = billData?.meta?.page || 1;
  const limit = billData?.meta?.limit || 20;
  const totalPages = billData?.meta?.totalPages || 1;
  const offset = (page - 1) * limit;

  const column: ColumnDef<TGetBillsResponse>[] = [
    { id: 'serial', header: 'SL.', cell: ({ row }) => <span>{offset + row.index + 1}</span> },
    {
      accessorKey: 'billId',
      header: 'Bill Id',
      cell: ({ getValue }) => <span className="whitespace-nowrap">{getValue<string>()}</span>,
    },
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
      accessorKey: 'services',
      header: 'Services',
      cell: ({ getValue }) => (
        <div className="flex flex-col gap-2">
          {getValue<TBill['services']>().map((service, index) => (
            <li key={index} className="whitespace-nowrap">
              {service.name}
            </li>
          ))}
        </div>
      ),
    },
    {
      accessorKey: 'paid',
      header: 'Paid',
      cell: ({ getValue }) => (
        <span className="whitespace-nowrap font-medium">
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
            <span className="whitespace-nowrap font-medium">
              {CONST.TAKA} {due}
            </span>
          );

        return <Badge>Paid</Badge>;
      },
    },
    {
      id: 'commission',
      header: 'Commission',
      cell: ({ row }) => {
        const { referrerCommission, visitCommission, visitorId, referrerId, transactions, doctor, agent } =
          row.original;

        if (!visitCommission && !referrerCommission)
          return (
            <span className="flex items-center gap-1 text-muted-foreground">
              <MdError /> Commission is not applicable
            </span>
          );

        return (
          <section className="space-y-2">
            <RenderCommissionInfo
              title="DOCTOR"
              name={doctor?.name}
              amount={visitCommission}
              transactions={transactions}
              userId={visitorId}
            />
            <RenderCommissionInfo
              title="AGENT"
              name={agent?.name}
              amount={referrerCommission}
              transactions={transactions}
              userId={referrerId}
            />
          </section>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: () => <span>Date</span>,
      cell: ({ getValue }) => <span className="whitespace-nowrap">{formatDate(getValue<string>())}</span>,
    },
    { id: 'action', cell: ({ row }) => <BillTableAction bill={row.original} /> },
  ];

  if (isLoading) return <TableLoader length={10} className="p-6" />;

  return (
    <div className="my-6 px-6">
      <DataTable columns={column} data={billData?.data || []} pagination={{ page, totalPages }} />
    </div>
  );
};

// helper components
const RenderCommissionInfo = ({ title, amount, userId, transactions, name }: TRenderCommissionInfo) => {
  if (!amount || !userId) return null;

  const transaction = transactions.find((transaction) => transaction._id === userId);
  const paid = transaction?.totalAmount || 0;

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-3 whitespace-nowrap">
        <span>{title === 'AGENT' ? 'Referred By : ' : 'Visited By : '}</span>
        <h2 className="whitespace-nowrap font-semibold">{name}</h2>
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <p className="whitespace-nowrap">
          Commission :{' '}
          <span className="whitespace-nowrap font-semibold">
            {CONST.TAKA} {amount}
          </span>
        </p>
        <p className="whitespace-nowrap">
          Paid :{' '}
          <span className="whitespace-nowrap font-semibold">
            {CONST.TAKA} {paid}
          </span>
        </p>
      </div>
    </div>
  );
};

// types
type TRenderCommissionInfo = {
  title: 'DOCTOR' | 'AGENT';
  name: string | undefined;
  userId?: string;
  amount?: number;
  transactions: TGetBillsResponse['transactions'];
};
