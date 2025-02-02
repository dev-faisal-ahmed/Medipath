import { cn } from '@/lib/utils';
import { TooltipContainer } from '../ui/tooltip';
import { Button } from '../ui/button';
import { hasNextMonth as dateHasNextMonth, hasPreviousMonth as dateHasPreviousMonth } from '@/helper';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

export const MonthPagination = ({ date, firstDate, lastDate, updateDate }: TMonthPaginationProps) => {
  const hasPreviousMonth = dateHasPreviousMonth({ currentDate: date, targetDate: new Date(firstDate) });
  const hasNextMonth = dateHasNextMonth({ currentDate: date, targetDate: new Date(lastDate) });

  const goPreviousMonth = () => {
    const currentDate = new Date(date);
    currentDate.setDate(1);
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateDate(currentDate);
  };

  const goNextMonth = () => {
    const currentDate = new Date(date);
    currentDate.setDate(1);
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateDate(currentDate);
  };

  return (
    <div className="sticky bottom-0 flex items-center justify-end gap-4 rounded-t-md bg-neutral-100 p-6">
      <TooltipContainer label="Go to previous month">
        <Button
          onClick={goPreviousMonth}
          disabled={!hasPreviousMonth}
          variant="outline"
          size="icon"
          className={cn(!hasPreviousMonth && 'cursor-not-allowed')}
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

type TMonthPaginationProps = {
  date: Date;
  updateDate(date: Date): void;
  firstDate: string | Date;
  lastDate: string | Date;
};
