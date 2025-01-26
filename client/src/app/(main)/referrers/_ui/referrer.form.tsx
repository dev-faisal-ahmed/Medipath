'use client';

import { CommonFormFiled, CommonSelect } from '@/components/shared/form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { REFERRER_TYPE } from '@/types/referrer.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const ReferrerForm = ({ formId, onSubmit, defaultValues }: TReferrerFormProps) => {
  const form = useForm<TReferrerForm>({
    resolver: zodResolver(referrerFormSchema),
    defaultValues: defaultValues || { name: '', designation: '', phone: '' },
  });

  return (
    <Form {...form}>
      <form className="space-y-3" id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        <CommonFormFiled control={form.control} name="name" label="Name∗">
          {({ field }) => <Input placeholder="@: Name" {...field} />}
        </CommonFormFiled>
        <CommonFormFiled control={form.control} name="type" label="Type∗">
          {({ field }) => (
            <CommonSelect
              options={Object.entries(REFERRER_TYPE).map(([label, value]) => ({ label, value }))}
              placeholder="Select referrer type"
              selected={field.value}
              onSelectChange={field.onChange}
            />
          )}
        </CommonFormFiled>
        <CommonFormFiled control={form.control} name="designation" label="Designation">
          {({ field }) => <Input placeholder="@: Designation" {...field} />}
        </CommonFormFiled>
        <CommonFormFiled control={form.control} name="phone" label="Phone Number">
          {({ field }) => <Input placeholder="@: Phone number" {...field} />}
        </CommonFormFiled>
      </form>
    </Form>
  );
};

const referrerFormSchema = z.object({
  name: z.string().min(1, { message: 'Referrer name is required' }),
  designation: z.string().optional(),
  type: z.nativeEnum(REFERRER_TYPE),
  phone: z.string().optional(),
});

// type
export type TReferrerForm = z.infer<typeof referrerFormSchema>;
type TReferrerFormProps = { formId: string; defaultValues?: TReferrerForm; onSubmit(formData: TReferrerForm): void };
