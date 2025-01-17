'use client';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

interface IProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>
  extends Omit<ControllerProps<TFieldValues, TName>, 'render'> {
  label?: string;
  description?: string;
  showMessage?: boolean;
  children: ControllerProps<TFieldValues, TName>['render'];
}

export const CommonFormFiled = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  label,
  description,
  children,
  showMessage = true,
  ...props
}: IProps<TFieldValues, TName>) => {
  return (
    <FormField
      {...props}
      render={(fieldProps) => (
        <FormItem>
          {label && <FormLabel className="font-semibold">{label}</FormLabel>}
          <FormControl>{children(fieldProps)}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {showMessage && <FormMessage />}
        </FormItem>
      )}
    />
  );
};
