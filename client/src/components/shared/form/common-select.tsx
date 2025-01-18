import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface IProps {
  options: { label: string; value: string }[];
  selected: string;
  onSelectChange(value: string): void;
  placeholder: string;
  className?: { trigger?: string };
}

export const CommonSelect = ({ options, selected, onSelectChange, placeholder, className }: IProps) => {
  return (
    <Select value={selected} onValueChange={onSelectChange}>
      <SelectTrigger className={className?.trigger}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
