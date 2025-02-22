'use client';

import { QK } from '@/api-lib';
import { getReferrerExpenses, TReferrerExpense } from '@/api-lib/query';
import { ExpenseCategoryLoader } from '@/components/ui/loader';
import { formatDate } from '@/helper';
import { REFERRER_TYPE } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { MonthPagination } from '../month-pagination';
import { Message } from '../message';
import { GiWallet } from 'react-icons/gi';
import { CONST } from '@/lib/const';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PrintWrapper } from '../print-wrapper';

export const RefererExpense = ({ referrerType }: { referrerType: REFERRER_TYPE }) => {
  const [date, setDate] = useState(new Date());

  const { data: response, isLoading } = useQuery({
    queryKey: [QK.EXPENSE, { referrerType, dateTime: formatDate(date) }],
    queryFn: () => getReferrerExpenses({ dateTime: date.toISOString(), referrerType }),
    select: (response) => ({
      transactions: response.data.transactions || [],
      firstTransactionDate: response.data.firstTransactionDate,
      lastTransactionDate: response.data.lastTransactionDate,
      total: response.data.total || 0,
    }),
  });

  const updateDate = useCallback((date: Date) => setDate(date), []);

  if (isLoading) return <ExpenseCategoryLoader />;

  const transactions = response?.transactions || [];
  const firstTransactionDate = response?.firstTransactionDate || new Date();
  const lastTransactionDate = response?.lastTransactionDate || new Date();
  const total = response?.total || 0;

  const transactionGroup = transactions.reduce((acc: TTransactionsGroup, transaction) => {
    const key = formatDate(transaction.date);
    if (!acc[key]) acc[key] = { transactions: [transaction], total: transaction.amount };
    else {
      acc[key].transactions.push(transaction);
      acc[key].total += transaction.amount;
    }

    return acc;
  }, {});

  const pdfTitle =
    referrerType === REFERRER_TYPE.AGENT
      ? `Referrer Expenses - ${formatDate(date, 'month')}`
      : `Doctor Expenses - ${formatDate(date, 'month')}`;

  return (
    <div className="flex h-full flex-col">
      <section className="my-6 grow px-6">
        <div className="mb-6 flex items-center gap-6">
          <h2 className="text-lg font-bold">Month : {formatDate(date, 'month')}</h2>
          <h2 className="ml-auto text-lg font-bold">
            Total : {CONST.TAKA} {total}
          </h2>

          <PrintWrapper title={pdfTitle} date={date}>
            <ReferrerExpenseTable date={date} total={total} transactions={transactions} />
          </PrintWrapper>
        </div>
        <TransactionList transactionGroup={transactionGroup} />
      </section>
      <MonthPagination
        date={date}
        updateDate={updateDate}
        firstDate={firstTransactionDate}
        lastDate={lastTransactionDate}
      />
    </div>
  );
};

const today = formatDate(new Date());
const TransactionList = ({ transactionGroup }: { transactionGroup: TTransactionsGroup }) => {
  const keys = Object.keys(transactionGroup);
  if (!keys.length) return <Message className="mt-6" message="No Expense Found" />;

  return (
    <section className="space-y-5">
      {keys.map((key) => (
        <div key={key}>
          <div className="mb-2 flex items-center gap-6">
            <h2 className="text-base font-bold">
              {key === today && 'Today,'} {key}
            </h2>
            <p className="font-semibold text-muted-foreground">
              ( {CONST.TAKA} {transactionGroup[key]?.total})
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {transactionGroup[key]?.transactions.map(({ id, referrer, amount }) => (
              <div key={id} className="flex items-center gap-4 rounded-md border bg-gray-50 p-3">
                <GiWallet className="size-5" />
                <h3 className="font-semibold">{referrer?.name}</h3>
                <p className="ml-auto whitespace-nowrap font-semibold">
                  {CONST.TAKA} {amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

const ReferrerExpenseTable = ({ date, total, transactions }: TTransactionTableProps) => (
  <>
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-lg font-bold">Month : {format(date, 'MMMM - yyyy')}</h2>
      <h2 className="text-lg font-bold">
        Total : {CONST.TAKA} {total}
      </h2>
    </div>

    <div className="w-full overflow-hidden rounded-md border">
      <Table>
        <TableHeader className="sticky top-0 bg-neutral-100">
          <TableRow>
            <TableHead>SL.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map(({ id, amount, date, referrer }, index) => (
            <TableRow key={id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="max-w-[350px]">{referrer.name}</TableCell>
              <TableCell>
                {CONST.TAKA} {amount}
              </TableCell>
              <TableCell>{format(date, 'dd-MM-yyyy')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </>
);

type TTransactionsGroup = Record<string, { transactions: TReferrerExpense['transactions']; total: number }>;
type TTransactionTableProps = { total: number; transactions: TReferrerExpense['transactions']; date: Date };
