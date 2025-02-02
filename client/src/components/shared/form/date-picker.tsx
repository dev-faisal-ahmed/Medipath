'use client';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calender';
import { CalendarDaysIcon } from 'lucide-react';

export const DatePicker = ({ date, onChange, disabled, className }: TDatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground', className)}
        >
          <CalendarDaysIcon className="mr-2 size-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={onChange} required disabled={disabled} />
      </PopoverContent>
    </Popover>
  );
};

// type
type TDatePickerProps = { date: Date; onChange(date: Date): void; disabled?(date: Date): boolean; className?: string };
