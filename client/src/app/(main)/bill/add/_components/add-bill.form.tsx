'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AGENT_TITLE, GENDER } from '@/types';
import { Form } from '@/components/ui/form';
import { addBillFormSchema, TAddBillForm } from './add-bill.schema';
import { SelectServices } from './select-services';
import { PatientInfo } from './patient-info';

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
        <form className="grid gap-4 sm:grid-cols-2">
          <SelectServices />
          <PatientInfo />
        </form>
      </Form>
    </div>
  );
};
