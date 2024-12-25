import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ReactNode } from 'react';

interface IProps {
  label?: string;
  description?: string;
  showMessage?: boolean;
  children: ReactNode;
}

export function CommonFormItem({ label, description, showMessage = true, children }: IProps) {
  return (
    <FormItem>
      {label && <FormLabel className="font-semibold">{label}</FormLabel>}
      <FormControl>{children}</FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      {showMessage && <FormMessage />}
    </FormItem>
  );
}
