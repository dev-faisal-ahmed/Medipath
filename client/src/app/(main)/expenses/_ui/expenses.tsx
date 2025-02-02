'use client';

import { QK } from '@/api-lib';
import { FullSpaceLoader } from '@/components/ui/loader';
import { getMonthlyExpenses, TMonthlyExpense } from '@/api-lib/query';
import { useTopbarStore } from '@/stores/topbar';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { Message, MonthPagination } from '@/components/shared';
import { format } from 'date-fns';
import { GiWallet } from 'react-icons/gi';
import { CONST } from '@/lib/const';
import { getDateForQueryKey } from '@/helper';

export const Expenses = () => {
  const mode = useTopbarStore((state) => state.mode);
  const [date, setDate] = useState(new Date());

  const { data: response, isLoading } = useQuery({
    queryKey: [QK.EXPENSE, { dateTime: getDateForQueryKey(date), mode }],
    queryFn: () => getMonthlyExpenses({ dateTime: date.toISOString(), mode }),
    select: (response) => ({
      expenses: response.data.expenses || [],
      firstExpenseDate: response.data.firstExpenseDate,
      lastExpenseDate: response.data.lastExpenseDate,
      total: response.data.total || 0,
    }),
  });

  const updateDate = useCallback((date: Date) => setDate(date), []);

  if (isLoading) return <FullSpaceLoader />;

  const expenses = response?.expenses || [];
  const firstExpenseDate = response?.firstExpenseDate || new Date();
  const lastExpenseDate = response?.lastExpenseDate || new Date();
  const total = response?.total || 0;

  return (
    <div className="flex h-full flex-col">
      <div className="my-6 grow px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold">Month : {format(date, 'MMMM - yyyy')}</h2>
          <h2 className="text-lg font-bold">
            Total : {CONST.TAKA} {total}
          </h2>
        </div>

        <ExpenseList expenses={expenses} />
      </div>
      <MonthPagination
        date={date}
        updateDate={updateDate}
        firstExpenseDate={firstExpenseDate}
        lastExpenseDate={lastExpenseDate}
      />
    </div>
  );
};

export const ExpenseList = ({ expenses }: { expenses: TMonthlyExpense['expenses'] }) => {
  if (!expenses.length) return <Message className="mt-6" message="No Expense Found" />;

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {expenses.map(({ id, amount, categoryName, description, date }) => (
        <div key={id} className="flex items-center gap-4 rounded-md border bg-white p-3">
          <div>
            <GiWallet className="size-12" />
          </div>
          <div>
            <h3 className="mb-1 font-semibold">{categoryName}</h3>
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
