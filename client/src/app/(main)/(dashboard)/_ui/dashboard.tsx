'use client';

import { QK } from '@/api-lib';
import { useState } from 'react';
import { format } from 'date-fns';
import { CONST } from '@/lib/const';
import { getDateForQueryKey } from '@/helper';
import { getOverview, OVERVIEW_TYPE } from '@/api-lib/query';
import { DatePicker } from '@/components/shared/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FullSpaceLoader } from '@/components/ui/loader';
import { useTopbarStore } from '@/stores/topbar';
import { useQuery } from '@tanstack/react-query';
import { CommissionCard } from './commission-card';
import { amber, emerald } from 'tailwindcss/colors';
import { SelectOverviewType } from './select-overview';
import { PickMonth } from './pick-month';

const referredColors = { paid: emerald[800], due: emerald[600], total: emerald[900] };
const doctorColors = { paid: amber[800], due: amber[600], total: amber[900] };

export const Dashboard = () => {
  const [type, setType] = useState(OVERVIEW_TYPE.DAILY);
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
      <div className="flex items-center gap-4 p-6">
        <h3 className="text-lg font-semibold">Date: {format(date, 'PPP')}</h3>

        <div className="ml-auto max-w-52">
          <SelectOverviewType value={type} onChange={setType} />
        </div>

        {type === OVERVIEW_TYPE.DAILY && <DatePicker date={date} onChange={setDate} className="w-fit" />}
        {type === OVERVIEW_TYPE.MONTHLY && <PickMonth date={date} updateDate={setDate} />}
      </div>
      <section className="grid gap-4 px-6 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="Balance" value={balance} />
        <SummaryCard title="Revenue" value={revenue} />
        <CommissionCard
          title="Referred Commission"
          paid={referredExpense || 0}
          due={(referredCommissionToPay || 0) - (referredExpense || 0)}
          colors={referredColors}
        />
        <CommissionCard
          title="Doctor Pc Commission"
          paid={doctorsPcExpense || 0}
          due={(doctorPcCommissionToPay || 0) - (doctorsPcExpense || 0)}
          colors={doctorColors}
        />
        <SummaryCard title="Due" value={due} />
        <SummaryCard title="Total Collection" value={totalCollection} />
        <SummaryCard title="Utility Expense" value={utilityExpense} />
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
