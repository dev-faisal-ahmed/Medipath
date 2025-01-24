'use client';

import { z } from 'zod';
import { QK } from '@/api-lib';
import { zodNumber } from '@/helper';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommonFormFiled, CommonSelect } from '@/components/shared/form';
import { DatePicker } from '@/components/shared/form/date-picker';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { getExpenseCategoryList } from '@/api-lib/query';

export const ExpenseForm = ({ formId, defaultValues, onSubmit }: IExpenseFormProps) => {
  const form = useForm<TExpenseForm>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: defaultValues || { amount: '', expenseCategoryId: '', details: '', date: new Date() },
  });

  const { data: expenseCategoryList, isLoading } = useQuery({
    queryKey: [QK.EXPENSE_CATEGORY, 'LIST'],
    queryFn: () => getExpenseCategoryList(),
    select: (response) => response.data.map((category) => ({ label: category.name, value: category._id })) || [],
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-3" id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        <CommonFormFiled control={form.control} name="date" label="Date">
          {({ field }) => (
            <DatePicker
              date={field.value}
              onChange={field.onChange}
              disabled={(date) => date.getTime() <= new Date('2025-01-01').getTime()}
            />
          )}
        </CommonFormFiled>
        <CommonFormFiled control={form.control} name="expenseCategoryId" label="Category">
          {({ field }) => (
            <CommonSelect
              options={expenseCategoryList || []}
              onSelectChange={field.onChange}
              placeholder="Select category"
              selected={field.value}
              isLoading={isLoading}
            />
          )}
        </CommonFormFiled>
        <CommonFormFiled control={form.control} name="amount" label="Amount">
          {({ field }) => <Input placeholder="Input amount" type="number" {...field} />}
        </CommonFormFiled>
        <CommonFormFiled control={form.control} name="details" label="Details">
          {({ field }) => <Textarea placeholder="Write down description" {...field} />}
        </CommonFormFiled>
      </form>
    </Form>
  );
};

const expenseFormSchema = z.object({
  expenseCategoryId: z.string().min(1, { message: 'Expense category is required' }),
  amount: zodNumber({ min: 0, message: 'Amount can not be negative' }),
  details: z.string().optional(),
  date: z.date(),
});

export type TExpenseForm = z.infer<typeof expenseFormSchema>;

interface IExpenseFormProps {
  formId: string;
  defaultValues?: TExpenseForm;
  onSubmit(values: TExpenseForm): void;
}
