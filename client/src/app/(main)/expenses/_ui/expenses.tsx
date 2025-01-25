'use client';

import { cn } from '@/lib/utils';
import { QK } from '@/api-lib';
import { FullSpaceLoader } from '@/components/ui/loader';
import { getMonthlyExpenses } from '@/api-lib/query';
import { hasNextMonth as dateHasNextMonth, hasPerviousMonth as dateHasPreviousMonth } from '@/helper';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTopbarStore } from '@/stores/topbar';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { ExpenseList } from './expense-list';
import { Button } from '@/components/ui/button';
import { TooltipContainer } from '@/components/ui/tooltip';

export const Expenses = () => {
  const mode = useTopbarStore((state) => state.mode);
  const [date, setDate] = useState(new Date());

  const { data: response, isLoading } = useQuery({
    queryKey: [QK.EXPENSE, { dateTime: date.toDateString(), mode }],
    queryFn: () => getMonthlyExpenses({ dateTime: date.toISOString(), mode }),
    select: (response) => ({
      expenses: response.data.expenses || [],
      firstExpenseDate: response.data.firstExpenseDate,
      lastExpenseDate: response.data.lastExpenseDate,
    }),
  });

  const updateDate = useCallback((date: Date) => setDate(date), []);

  if (isLoading) return <FullSpaceLoader />;

  const expenses = response?.expenses || [];
  const firstExpenseDate = response?.firstExpenseDate || new Date();
  const lastExpenseDate = response?.lastExpenseDate || new Date();

  return (
    <>
      <ScrollArea className="grow">
        <ExpenseList expenses={expenses} dateTime={date} />
      </ScrollArea>
      <Pagination
        date={date}
        updateDate={updateDate}
        firstExpenseDate={firstExpenseDate}
        lastExpenseDate={lastExpenseDate}
      />
    </>
  );
};

const Pagination = ({ date, firstExpenseDate, lastExpenseDate, updateDate }: TPaginationProps) => {
  const hasPerviousMonth = dateHasPreviousMonth({ currentDate: date, targetDate: new Date(firstExpenseDate) });
  const hasNextMonth = dateHasNextMonth({ currentDate: date, targetDate: new Date(lastExpenseDate) });

  const goPreviousMonth = () => {
    const currentDate = new Date(date);
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateDate(currentDate);
  };

  const goNextMonth = () => {
    const currentDate = new Date(date);
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateDate(currentDate);
  };

  return (
    <div className="sticky bottom-0 flex items-center justify-end gap-4 bg-neutral-100 p-6">
      <TooltipContainer label="Go to previous month">
        <Button
          onClick={goPreviousMonth}
          disabled={!hasPerviousMonth}
          variant="outline"
          size="icon"
          className={cn(!hasPerviousMonth && 'cursor-not-allowed')}
        >
          <ArrowLeftIcon />
        </Button>
      </TooltipContainer>
      <TooltipContainer label="Go to next month">
        <Button
          onClick={goNextMonth}
          disabled={!hasNextMonth}
          variant="outline"
          size="icon"
          className={cn(!hasNextMonth && 'cursor-not-allowed')}
        >
          <ArrowRightIcon />
        </Button>
      </TooltipContainer>
    </div>
  );
};

// types
type TPaginationProps = {
  date: Date;
  updateDate(date: Date): void;
  firstExpenseDate: string | Date;
  lastExpenseDate: string | Date;
};
