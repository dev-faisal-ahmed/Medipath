'use client';

import { CommonFormFiled } from '@/components/shared/form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const CategoryForm = ({ formId, onSubmit, defaultValues }: TCategoryFormProps) => {
  const form = useForm<TCategoryForm>({
    resolver: zodResolver(categoryFormSchema),
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

const categoryFormSchema = z.object({
  name: z.string().min(1, { message: 'Category name is required' }).toUpperCase().trim(),
});
export type TCategoryForm = z.infer<typeof categoryFormSchema>;

type TCategoryFormProps = {
  formId: string;
  onSubmit(values: TCategoryForm): void;
  defaultValues?: TCategoryForm;
};
