'use client';

import { QK } from '@/api-lib';
import { format } from 'date-fns';
import { CONST } from '@/lib/const';
import { ExpenseCategoryLoader } from '@/components/ui/loader';
import { getMonthlyExpenses, TMonthlyExpense } from '@/api-lib/query';
import { formatDate } from '@/helper';
import { useTopbarStore } from '@/stores/topbar';
import { useQuery } from '@tanstack/react-query';
import { Message, MonthPagination } from '@/components/shared';
import { useCallback, useState } from 'react';
import { GiWallet } from 'react-icons/gi';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PrintWrapper } from '@/components/shared/print-wrapper';

// Composer
export const Expenses = () => {
  const mode = useTopbarStore((state) => state.mode);
  const [date, setDate] = useState(new Date());

  const { data: response, isLoading } = useQuery({
    queryKey: [QK.EXPENSE, { dateTime: formatDate(date), mode }],
    queryFn: () => getMonthlyExpenses({ dateTime: date.toISOString(), mode }),
    select: (response) => ({
      expenses: response.data.expenses || [],
      firstExpenseDate: response.data.firstExpenseDate,
      lastExpenseDate: response.data.lastExpenseDate,
      total: response.data.total || 0,
    }),
  });

  const updateDate = useCallback((date: Date) => setDate(date), []);

  if (isLoading) return <ExpenseCategoryLoader />;

  const expenses = response?.expenses || [];
  const firstExpenseDate = response?.firstExpenseDate || new Date();
  const lastExpenseDate = response?.lastExpenseDate || new Date();
  const total = response?.total || 0;

  const expenseGroup = expenses.reduce((acc: TExpenseGroup, expense) => {
    const key = formatDate(expense.date);
    if (!acc[key]) acc[key] = { expenses: [expense], total: expense.amount };
    else {
      acc[key].expenses.push(expense);
      acc[key].total += expense.amount;
    }

    return acc;
  }, {});

  return (
    <div className="flex h-full flex-col">
      <div className="my-6 grow px-6">
        <div className="mb-6 flex items-center gap-6">
          <h2 className="text-lg font-bold">Month : {format(date, 'MMMM - yyyy')}</h2>
          <h2 className="ml-auto text-lg font-bold">
            Total : {CONST.TAKA} {total}
          </h2>

          <PrintWrapper title={'Expenses'} date={date}>
            <ExpenseTable date={date} total={total} expenses={expenses} />
          </PrintWrapper>
        </div>
        <ExpenseList expenseGroup={expenseGroup} />
      </div>
      <MonthPagination date={date} updateDate={updateDate} firstDate={firstExpenseDate} lastDate={lastExpenseDate} />
    </div>
  );
};

// UI
const ExpenseList = ({ expenseGroup }: { expenseGroup: TExpenseGroup }) => {
  const keys = Object.keys(expenseGroup);
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
              ( {CONST.TAKA} {expenseGroup[key]?.total})
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {expenseGroup[key]?.expenses.map(({ id, categoryName, amount, description }) => (
              <div
                key={id}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-md border bg-gray-50 p-3"
              >
                <GiWallet className="size-8" />
                <div>
                  <h3 className="font-semibold">{categoryName}</h3>
                  <p className="mt-1 line-clamp-1 text-muted-foreground duration-500 hover:line-clamp-none">
                    {description ? description : 'No Description available'}
                  </p>
                </div>

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

// UI
const ExpenseTable = ({ date, total, expenses }: TPrintExpensesProps) => {
  return (
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
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map(({ id, categoryName, description, amount, date }, index) => (
              <TableRow key={id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{categoryName}</TableCell>
                <TableCell>{description || 'Description is not available'}</TableCell>
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
};

// const
const today = formatDate(new Date());

// types
type TExpenseGroup = Record<string, { expenses: TMonthlyExpense['expenses']; total: number }>;
type TPrintExpensesProps = { total: number; expenses: TMonthlyExpense['expenses']; date: Date };
