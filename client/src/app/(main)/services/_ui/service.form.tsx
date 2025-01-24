'use client';

import { CommonFormFiled } from '@/components/shared/form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { wordCapitalize } from '@/helper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const ServiceForm = ({ formId, defaultValues, onSubmit }: TServiceFormProps) => {
  const form = useForm<TServiceForm>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: defaultValues || { name: '', price: '', roomNo: '' },
  });

  return (
    <Form {...form}>
      <form className="space-y-3" id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        <CommonFormFiled name="name" label="Name∗">
          {({ field }) => <Input {...field} placeholder="@: X-Ray" />}
        </CommonFormFiled>
        <CommonFormFiled name="price" label="Price∗">
          {({ field }) => <Input {...field} placeholder="@: 450" />}
        </CommonFormFiled>
        <CommonFormFiled name="roomNo" label="Room No">
          {({ field }) => <Input {...field} placeholder="@ 203" />}
        </CommonFormFiled>
      </form>
    </Form>
  );
};

const serviceFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Service name is required' })
    .transform((val) => wordCapitalize(val)),
  price: z.string().refine((val) => Number(val) >= 50, { message: 'Minimum price is 50 tk' }),
  roomNo: z.string().optional(),
});

export type TServiceForm = z.infer<typeof serviceFormSchema>;
type TServiceFormProps = { formId: string; defaultValues?: TServiceForm; onSubmit(formData: TServiceForm): void };
