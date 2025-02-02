'use client';

import { QK } from '@/api-lib';
import { getReferrerExpenses, TReferrerExpense } from '@/api-lib/query';
import { FullSpaceLoader } from '@/components/ui/loader';
import { getDateForQueryKey } from '@/helper';
import { REFERRER_TYPE } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useCallback, useState } from 'react';
import { MonthPagination } from '../month-pagination';
import { Message } from '../message';
import { GiWallet } from 'react-icons/gi';
import { CONST } from '@/lib/const';

export const RefererExpense = ({ referrerType }: { referrerType: REFERRER_TYPE }) => {
  const [date, setDate] = useState(new Date());

  const { data: response, isLoading } = useQuery({
    queryKey: [QK.EXPENSE, { referrerType, dateTime: getDateForQueryKey(date) }],
    queryFn: () => getReferrerExpenses({ darTime: date.toISOString(), referrerType }),
    select: (response) => ({
      transactions: response.data.transactions || [],
      firstExpenseDate: response.data.firstExpenseDate,
      lastExpenseDate: response.data.lastExpenseDate,
      total: response.data.total || 0,
    }),
  });

  const updateDate = useCallback((date: Date) => setDate(date), []);

  if (isLoading) return <FullSpaceLoader />;

  const transactions = response?.transactions || [];
  const firstExpenseDate = response?.firstExpenseDate || new Date();
  const lastExpenseDate = response?.lastExpenseDate || new Date();
  const total = response?.total || 0;

  return (
    <div className="flex h-full flex-col">
      <section className="my-6 grow px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold">Month : {format(date, 'MMMM - yyyy')}</h2>
          <h2 className="text-lg font-bold">
            Total : {CONST.TAKA} {total}
          </h2>
        </div>
        <TransactionList transactions={transactions} />
      </section>

      <MonthPagination
        date={date}
        updateDate={updateDate}
        firstExpenseDate={firstExpenseDate}
        lastExpenseDate={lastExpenseDate}
      />
    </div>
  );
};

const TransactionList = ({ transactions }: { transactions: TReferrerExpense['transactions'] }) => {
  if (!transactions.length) return <Message className="mt-6" message="No Transactions Found" />;

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {transactions.map(({ id, amount, description, date, referrer }) => (
        <div key={id} className="flex items-center gap-4 rounded-md border bg-white p-3">
          <div>
            <GiWallet className="size-12" />
          </div>
          <div>
            <h3 className="mb-1 font-semibold">{referrer.name}</h3>
            {description && <p className="line-clamp-1 break-all text-sm text-muted-foreground">{description}</p>}
            <p className="text-sm text-muted-foreground">{format(date, 'do MMM, yyyy')}</p>
          </div>

          <p className="ml-auto whitespace-nowrap text-lg font-semibold">
            {CONST.TAKA} {amount}
          </p>
        </div>
      ))}
    </div>
  );
};
