'use client';

import { CommonFormFiled } from '@/components/shared/form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const ExpenseCategoryForm = ({ formId, onSubmit, defaultValues }: TExpenseCategoryFormProps) => {
  const form = useForm<TExpenseCategoryForm>({
    resolver: zodResolver(expenseCategoryFormSchema),
    defaultValues: defaultValues || { name: '' },
  });

  return (
    <Form {...form}>
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        <CommonFormFiled control={form.control} name="name" label="Category Name">
          {({ field }) => <Input placeholder="Input category name" {...field} />}
        </CommonFormFiled>
      </form>
    </Form>
  );
};

const expenseCategoryFormSchema = z.object({ name: z.string().min(1, { message: 'Category name is required' }) });
export type TExpenseCategoryForm = z.infer<typeof expenseCategoryFormSchema>;

type TExpenseCategoryFormProps = {
  formId: string;
  onSubmit(values: TExpenseCategoryForm): void;
  defaultValues?: TExpenseCategoryForm;
};
