'use client';

import { QK } from '@/api-lib';
import { getMonthlyExpenses } from '@/api-lib/query';
import { FullSpaceLoader } from '@/components/ui/loader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTopbarStore } from '@/stores/topbar';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ExpenseList } from './expense-list';

export const Expenses = () => {
  const mode = useTopbarStore((state) => state.mode);
  const [date, setDate] = useState(new Date());

  const { data: response, isLoading } = useQuery({
    queryKey: [QK.EXPENSE, { dateTime: date, mode }],
    queryFn: () => getMonthlyExpenses({ dateTime: date.toISOString(), mode }),
    select: (response) => ({
      expenses: response.data.expenses || [],
      firstExpenseDate: response.data.firstExpenseDate,
      lastExpenseDate: response.data.lastExpenseDate,
    }),
  });

  if (isLoading) return <FullSpaceLoader />;

  const expenses = response?.expenses || [];
  const firstExpenseDate = response?.firstExpenseDate;
  const lastExpenseDate = response?.lastExpenseDate;

  return (
    <ScrollArea className="grow">
      <ExpenseList expenses={expenses} dateTime={date} />
    </ScrollArea>
  );
};
