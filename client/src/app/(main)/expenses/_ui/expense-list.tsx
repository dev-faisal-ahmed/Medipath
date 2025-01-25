'use client';

import { TMonthlyExpense } from '@/api-lib/query';
import { Message } from '@/components/shared';
import { CONST } from '@/lib/const';
import { format } from 'date-fns';
import { GiWallet } from 'react-icons/gi';

export const ExpenseList = ({ expenses, dateTime }: TExpenseListProps) => {
  if (!expenses.length) return <Message className="mt-6" message="No Expense Found" />;

  return (
    <section className="p-6">
      <h2 className="mb-4 text-lg font-bold">Month : {format(dateTime, 'MMMM - yyyy')}</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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
    </section>
  );
};

type TExpenseListProps = {
  expenses: TMonthlyExpense['expenses'];
  dateTime: Date;
};
