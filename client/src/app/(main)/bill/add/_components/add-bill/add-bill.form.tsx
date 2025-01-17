'use client';

import type { TAddBillForm } from './bill.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { addBillFormSchema } from './bill.schema';
import { useForm } from 'react-hook-form';
import { AGENT_TITLE, GENDER } from '@/types';
import { Form } from '@/components/ui/form';
import { CommonFormFiled } from '@/components/shared/form';
import { SelectServices } from '@/components/shared/bill/select-services';

export const AddBillForm = () => {
  const form = useForm<TAddBillForm>({
    resolver: zodResolver(addBillFormSchema),
    defaultValues: {
      services: [],
      patientInfo: { name: '', age: '', ageTitle: AGENT_TITLE.YEAR, phone: '', gender: GENDER.MALE, address: '' },
      visitorId: '',
      referrerId: '',
      visitCommission: '',
      referrerCommission: '',
      discount: '',
      paid: '',
    },
  });

  return (
    <div className="mx-auto max-w-screen-sm">
      <Form {...form}>
        <form>
          <CommonFormFiled control={form.control} name="services">
            {({ field }) => <SelectServices value={field.value} onValueChange={field.onChange} />}
          </CommonFormFiled>
        </form>
      </Form>
    </div>
  );
};
