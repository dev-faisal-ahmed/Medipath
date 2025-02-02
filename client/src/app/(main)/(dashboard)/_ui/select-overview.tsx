import { OVERVIEW_TYPE } from '@/api-lib/query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const SelectOverviewType = ({ value, onChange }: TSelectOverviewProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Select Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={OVERVIEW_TYPE.DAILY}>Daily</SelectItem>
        <SelectItem value={OVERVIEW_TYPE.MONTHLY}>Monthly</SelectItem>
      </SelectContent>
    </Select>
  );
};

// type
type TSelectOverviewProps = {
  value: OVERVIEW_TYPE;
  onChange(value: OVERVIEW_TYPE): void;
};
