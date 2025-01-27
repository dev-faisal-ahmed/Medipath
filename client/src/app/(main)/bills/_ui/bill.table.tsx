'use client';

import Link from 'next/link';

import { TBill } from '@/types';
import { QK } from '@/api-lib';
import { getBills, TGetBillsResponse } from '@/api-lib/query';
import { DataTable, DataTableAction } from '@/components/ui/data-table';
import { FullSpaceLoader } from '@/components/ui/loader';
import { removeEmptyProperty } from '@/helper';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useSearchParams } from 'next/navigation';
import { CONST } from '@/lib/const';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { TakeDue } from './take-due';
import { Badge } from '@/components/ui/badge';
import { useTopbarStore } from '@/stores/topbar';
import { usePopupState } from '@/hooks';
import { FaUserMd, FaUserSecret } from 'react-icons/fa';

const LIMIT = '20';

export const BillTable = () => {
  const searchTerm = useTopbarStore((state) => state.searchTerm);
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

  const column: ColumnDef<TGetBillsResponse>[] = [
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
      id: 'commission',
      header: 'Commission',
      cell: ({ row }) => {
        const { referrerCommission, visitCommission, visitorId, referrerId, transactions } = row.original;

        if (!visitCommission && !referrerCommission) return <span>Commission is not applicable</span>;

        return (
          <section className="space-y-2">
            <RenderCommissionInfo
              title="DOCTOR"
              amount={visitCommission}
              transactions={transactions}
              userId={visitorId}
            />
            <RenderCommissionInfo
              title="AGENT"
              amount={referrerCommission}
              transactions={transactions}
              userId={referrerId}
            />
          </section>
        );
      },
    },
    {
      accessorKey: 'date',
      header: () => <span>Date</span>,
      cell: ({ getValue }) => <span>{format(getValue<string>(), 'dd MMM, yyyy')}</span>,
    },
    {
      id: 'action',
      cell: ({ row }) => {
        const { paid, price, discount, id } = row.original;
        const due = price - (paid || 0) - (discount || 0);

        return <ActionMenu billId={id} due={due} />;
      },
    },
  ];

  if (isLoading) return <FullSpaceLoader />;

  return <DataTable columns={column} data={billData?.data || []} pagination={{ page, totalPages }} />;
};

// helper components
const RenderCommissionInfo = ({ title, amount, userId, transactions }: TRenderCommissionInfo) => {
  if (!amount || !userId) return null;

  const transaction = transactions.find((transaction) => transaction._id === userId);
  const paid = transaction?.totalAmount || 0;

  return (
    <div className="flex items-center gap-2">
      <span className="rounded-full border p-2">
        {title === 'DOCTOR' && <FaUserMd className="text-primary" size={18} />}
        {title === 'AGENT' && <FaUserSecret className="text-primary" size={18} />}
      </span>

      <p>
        Commission :{' '}
        <span className="font-semibold">
          {CONST.TAKA} {amount}
        </span>
      </p>
      <p className="ml-4">
        Paid :{' '}
        <span className="font-semibold">
          {CONST.TAKA} {paid}
        </span>
      </p>
    </div>
  );
};

const ActionMenu = ({ billId, due }: { billId: string; due: number }) => {
  const { open, onOpenChange } = usePopupState();

  return (
    <DataTableAction open={open} onOpenChange={onOpenChange} className={{ childContainer: 'gap-3 p-3' }}>
      <Button variant="outline" asChild>
        <Link href={`/bill/${billId}`}>View Receipt</Link>
      </Button>
      {due ? <TakeDue billId={billId} /> : <Button variant="secondary">Already Paid</Button>}
    </DataTableAction>
  );
};

// types
type TRenderCommissionInfo = {
  title: 'DOCTOR' | 'AGENT';
  userId?: string;
  amount?: number;
  transactions: TGetBillsResponse['transactions'];
};
