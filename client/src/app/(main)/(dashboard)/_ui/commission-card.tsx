import { CONST } from '@/lib/const';
import { Pie, PieChart } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const CommissionCard = ({ title, paid, due, colors }: TCommissionCardProps) => {
  const chartData = [
    { type: 'paid', amount: paid, fill: colors.paid },
    { type: 'due', amount: due, fill: colors.due },
  ];

  const fallbackData = [{ type: 'total', amount: 1, fill: colors.total }];

  const chartConfig = {
    amount: {
      label: 'Amount',
    },
    paid: { label: 'Paid' },
    due: { label: 'Due' },
  };

  return (
    <Card className="row-span-3">
      <CardHeader>
        <CardTitle> {title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[180px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={due || paid ? chartData : fallbackData}
              dataKey="amount"
              nameKey="type"
              innerRadius={50}
              paddingAngle={5}
            />
          </PieChart>
        </ChartContainer>
        <div className="mx-auto mt-2 grid w-fit grid-cols-2 gap-x-4 gap-y-1">
          <Description title="Paid" amount={paid} color={colors.paid} />
          <Description title="Due" amount={due} color={colors.due} />
          <Description title="Total" amount={due + paid} color={colors.total} />
        </div>
      </CardContent>
    </Card>
  );
};

const Description = ({ title, amount, color }: TDescriptionProps) => {
  return (
    <>
      <p className="flex items-center gap-1">
        <span style={{ backgroundColor: color }} className="block size-3 rounded-[2px]" />
        {title}
      </p>
      <p>
        {CONST.TAKA} <span className="text-lg font-bold">{amount}</span>
      </p>
    </>
  );
};

type TCommissionCardProps = {
  title: string;
  due: number;
  paid: number;
  colors: { paid: string; due: string; total: string };
};

type TDescriptionProps = {
  title: string;
  amount: number;
  color: string;
};
