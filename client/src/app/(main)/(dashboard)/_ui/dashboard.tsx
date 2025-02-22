'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { QK } from '@/api-lib';
import { useState } from 'react';
import { format } from 'date-fns';
import { CONST } from '@/lib/const';
import { formatDate } from '@/helper';
import { getOverview, OVERVIEW_TYPE } from '@/api-lib/query';
import { DatePicker } from '@/components/shared/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTopbarStore } from '@/stores/topbar.store';
import { useQuery } from '@tanstack/react-query';
import { CommissionCard } from './commission-card';
import { amber, emerald } from 'tailwindcss/colors';
import { SelectOverviewType } from './select-overview';
import { RecentBills } from './recent-bills';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { TableLoader } from '@/components/ui/loader';
import { PickMonth } from './pick-month';

const referredColors = { paid: emerald[800], due: emerald[600], total: emerald[900] };
const doctorColors = { paid: amber[800], due: amber[600], total: amber[900] };

export const Dashboard = () => {
  const [type, setType] = useState(OVERVIEW_TYPE.DAILY);
  const [date, setDate] = useState(new Date());
  const mode = useTopbarStore((state) => state.mode);

  const { data: overviewData, isLoading } = useQuery({
    queryKey: [QK.OVERVIEW, { date: formatDate(date), type, mode }],
    queryFn: () => getOverview({ dateTime: date, mode, type }),
  });

  if (isLoading) return <DashboardLoader />;

  const overview = overviewData?.data;
  if (!overview) return <div className="flex grow items-center justify-center font-semibold">No Data Found</div>;

  const {
    revenue = 0,
    totalCollection = 0,
    due = 0,
    doctorsPcExpense = 0,
    referredExpense = 0,
    utilityExpense = 0,
    doctorPcCommissionToPay = 0,
    referredCommissionToPay = 0,
  } = overview;

  const balance = totalCollection - (utilityExpense + referredExpense + doctorsPcExpense);

  const dueData = {
    referred: referredCommissionToPay - referredExpense,
    doctor: doctorPcCommissionToPay - doctorsPcExpense,
  };

  const referredCommissionDue = dueData.referred < 0 ? 0 : dueData.referred;
  const doctorsCommissionDue = dueData.doctor < 0 ? 0 : dueData.doctor;

  return (
    <ScrollArea>
      <div className="flex items-center gap-4 p-6">
        <h3 className="text-lg font-semibold">
          Date: {type === OVERVIEW_TYPE.DAILY ? formatDate(date) : format(date, 'MMMM - yyyy')}
        </h3>

        <div className="ml-auto w-fit">
          <SelectOverviewType value={type} onChange={setType} />
        </div>

        {type === OVERVIEW_TYPE.DAILY && <DatePicker date={date} onChange={setDate} className="w-fit" />}
        {type === OVERVIEW_TYPE.MONTHLY && <PickMonth date={date} updateDate={setDate} />}
      </div>
      <section className="grid gap-4 px-6 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="Balance" value={balance} />
        <SummaryCard title="Revenue" value={revenue} />
        <CommissionCard
          title="Referred Commission"
          paid={referredExpense || 0}
          due={referredCommissionDue}
          colors={referredColors}
        />
        <CommissionCard
          title="Doctor Pc Commission"
          paid={doctorsPcExpense || 0}
          due={doctorsCommissionDue}
          colors={doctorColors}
        />
        <SummaryCard title="Due" value={due} />
        <SummaryCard title="Total Collection" value={totalCollection} />
        <SummaryCard title="Utility Expense" value={utilityExpense} />
      </section>

      <div className="my-6 flex grow flex-col gap-4 px-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Bills</h3>
          <Link href="/bills" className="font-semibold text-primary underline">
            View All
          </Link>
        </div>

        <RecentBills bills={overview.bills} />
      </div>
    </ScrollArea>
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

const DashboardLoader = () => (
  <>
    <div className="flex items-center gap-4 p-6">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="ml-auto h-8 w-24" />
      <Skeleton className="h-8 w-24" />
    </div>

    <div className="grid gap-4 px-6 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 7 }).map((_, index) => (
        <Skeleton className={cn('h-32 w-full', (index === 2 || index === 3) && 'row-span-2 h-full')} key={index} />
      ))}
    </div>
    <div className="mt-8 px-6">
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-20" />
      </div>
      <TableLoader length={4} />
    </div>
  </>
);

// types
type TSummaryCardProps = {
  title: string;
  value: number | undefined;
};
