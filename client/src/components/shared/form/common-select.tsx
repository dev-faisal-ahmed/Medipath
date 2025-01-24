import { Loading } from '@/components/ui/loader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMemo } from 'react';
import { Message } from '../message';

interface IProps {
  options: { label: string; value: string }[];
  selected: string;
  onSelectChange(value: string): void;
  placeholder: string;
  className?: { trigger?: string };
  isLoading?: boolean;
}

export const CommonSelect = ({ options, selected, onSelectChange, placeholder, className, isLoading }: IProps) => {
  const content = useMemo(() => {
    if (isLoading) return <Loading />;
    if (options.length === 0) return <Message message="No data found" />;

    return options.map(({ label, value }) => (
      <SelectItem key={value} value={value}>
        {label}
      </SelectItem>
    ));
  }, [isLoading, options]);

  return (
    <Select value={selected} onValueChange={onSelectChange}>
      <SelectTrigger className={className?.trigger}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>{content}</SelectContent>
    </Select>
  );
};
