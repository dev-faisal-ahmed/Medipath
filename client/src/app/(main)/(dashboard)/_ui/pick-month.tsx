'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const PickMonth = ({ date, updateDate }: TPickMonth) => {
  const updateYear = (value: string) => {
    const currentDate = new Date(date);
    currentDate.setFullYear(parseInt(value));
    updateDate(currentDate);
  };

  const updateMonth = (value: string) => {
    const currentDate = new Date(date);
    currentDate.setDate(1);
    currentDate.setMonth(parseInt(value));
    updateDate(currentDate);
  };

  return (
    <div className="flex items-center gap-3">
      <Select value={date.getFullYear().toString()} onValueChange={updateYear}>
        <SelectTrigger className="w-24">
          <SelectValue placeholder="Select Year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={date.getMonth().toString()} onValueChange={updateMonth}>
        <SelectTrigger className="w-24">
          <SelectValue placeholder="Select Month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month, index) => (
            <SelectItem key={index} value={index.toString()}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

// consts
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const years = [2024, 2025, 2026];

// type
type TPickMonth = {
  date: Date;
  updateDate(date: Date): void;
};
