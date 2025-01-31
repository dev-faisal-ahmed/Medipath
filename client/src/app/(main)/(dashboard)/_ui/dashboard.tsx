'use client';

import { QK } from '@/api-lib';
import { getOverview, OVERVIEW_TYPE } from '@/api-lib/query';
import { DatePicker } from '@/components/shared/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FullSpaceLoader } from '@/components/ui/loader';
import { getDateForQueryKey } from '@/helper';
import { CONST } from '@/lib/const';
import { useTopbarStore } from '@/stores/topbar';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';

export const Dashboard = () => {
  const [type] = useState(OVERVIEW_TYPE.DAILY);
  const [date, setDate] = useState(new Date());
  const mode = useTopbarStore((state) => state.mode);

  const { data: overviewData, isLoading } = useQuery({
    queryKey: [QK.OVERVIEW, { date: getDateForQueryKey(date), type, mode }],
    queryFn: () => getOverview({ dateTime: date, mode, type }),
  });

  if (isLoading) return <FullSpaceLoader />;

  const overview = overviewData?.data;

  if (!overview) return <div className="flex grow items-center justify-center font-semibold">No Data Found</div>;

  const {
    revenue,
    totalCollection,
    due,
    doctorsPcExpense,
    referredExpense,
    utilityExpense,
    doctorPcCommissionToPay,
    referredCommissionToPay,
  } = overview;

  const balance = totalCollection - (utilityExpense + referredExpense + doctorsPcExpense);

  return (
    <>
      <div className="flex items-center justify-between gap-4 p-6">
        <h3 className="text-lg font-semibold">Date: {format(date, 'PPP')}</h3>
        <div className="w-fit">
          <DatePicker date={date} onChange={setDate} />
        </div>
      </div>
      <section className="grid gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <SummaryCard title="Balance" value={balance} />
        <SummaryCard title="Revenue" value={revenue} />
        <SummaryCard title="Total Collection" value={totalCollection} />
        <SummaryCard title="Due" value={due} />
        <SummaryCard title="Referred Expense" value={referredExpense} />
        <SummaryCard title="Doctors PC Expense" value={doctorsPcExpense} />
        <SummaryCard title="Utility Expense" value={utilityExpense} />
        <SummaryCard title="Referred Commission Due" value={referredCommissionToPay - referredExpense} />
        <SummaryCard title="Doctor PC Due" value={doctorPcCommissionToPay - doctorsPcExpense} />
      </section>
    </>
  );
};

const SummaryCard = ({ title, value }: TSummaryCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-bold">
          {CONST.TAKA} {value || 0}
        </p>
      </CardContent>
    </Card>
  );
};

// types
type TSummaryCardProps = {
  title: string;
  value: number | undefined;
};
