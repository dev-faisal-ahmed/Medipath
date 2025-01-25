'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const Calendar = ({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-2 relative',
        month: 'space-y-4',
        month_caption: 'flex justify-center relative items-center gap-2',
        caption_label: 'text-sm font-medium',
        month_grid: 'w-full border-collapse space-y-1 ',
        weekdays: 'flex',
        weekday: 'text-muted-foreground rounded w-9 font-normal text-[0.8rem]',
        week: 'flex w-full mt-2',
        day: 'transition text-center text-sm p-0 relative focus-within:relative focus-within:z-20 hover:text-primary/70 rounded-md',
        day_button: 'h-9 w-9 p-0 font-normal rounded hover:bg-primary/10 transition ',
        range_start: 'rounded-l',
        range_end: 'rounded-r',
        selected: 'bg-primary text-white hover:bg-primary/70 hover:text-white focus:bg-primary/70',
        today: 'text-primary',
        outside:
          'text-muted-foreground opacity-50 hover:opacity-80 aria-selected:bg-primary/10 aria-selected:text-primary',
        disabled: 'text-muted-foreground pointer-events-none',
        range_middle:
          'aria-selected:bg-primary/20 aria-selected:text-primary rounded-none first:rounded-l last:rounded-r',
        hidden: 'invisible',
        nav: 'absolute inset-x-0 pointer-events-none flex justify-between items-center',
        button_previous:
          'pointer-events-auto z-10 text-secondary-foreground hover:text-primary text-xl disabled:text-secondary-foreground/50',
        button_next:
          'pointer-events-auto z-10 text-secondary-foreground hover:text-primary text-xl disabled:text-secondary-foreground/50',
        ...classNames,
      }}
      {...props}
      components={{
        Chevron: (props) => {
          if (props.orientation === 'left') return <ChevronLeftIcon {...props} />;
          return <ChevronRightIcon {...props} />;
        },
      }}
    />
  );
};
Calendar.displayName = 'Calendar';

export { Calendar };
