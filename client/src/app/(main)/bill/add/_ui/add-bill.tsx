'use client';

import { QK } from '@/api-lib';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { errorMessageGen } from '@/helper';
import { addBill } from '@/api-lib/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addBillFormSchema, TAddBillForm } from './add-bill-form.schema';
import { SelectReferrers } from '@/components/shared/select-referrers';
import { SelectServices } from './select-services';
import { BillPrice } from './bill-price';
import { useForm } from 'react-hook-form';
import { AGE_TITLE, GENDER } from '@/types';
import { Form } from '@/components/ui/form';
import { PatientInfo } from './patient-info';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export const AddBill = () => {
  const router = useRouter();
  const qc = useQueryClient();

  const form = useForm<TAddBillForm>({
    resolver: zodResolver(addBillFormSchema),
    defaultValues: {
      services: [],
      patientInfo: { name: '', age: '', ageTitle: '', phone: '', gender: '', address: '' },
      visitorId: '',
      referrerId: '',
      visitCommission: '',
      referrerCommission: '',
      discount: '',
      paid: '',
    },
  });

  const services = form.watch('services');
  const price = services.reduce((acc, service) => {
    acc += service.price;
    return acc;
  }, 0);

  const { mutate, isPending } = useMutation({
    mutationFn: addBill,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.BILL] });
      qc.invalidateQueries({ queryKey: [QK.OVERVIEW] });
      qc.invalidateQueries({ queryKey: [QK.REFERRER] });
      form.reset();
      router.push(`/bill/${res.data.billId}`);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const handleAddBill = form.handleSubmit((formData) => {
    const {
      patientInfo: { age, gender, ageTitle },
      visitCommission,
      referrerCommission,
      discount,
      paid,
    } = formData;

    mutate({
      ...formData,
      patientInfo: {
        ...formData.patientInfo,
        age: Number(age),
        gender: gender as GENDER,
        ageTitle: ageTitle as AGE_TITLE,
      },
      referrerCommission: Number(referrerCommission),
      visitCommission: Number(visitCommission),
      discount: Number(discount),
      paid: Number(paid),
    });
  });

  return (
    <ScrollArea className="grow">
      <div className="mx-auto max-w-screen-lg p-6">
        <Form {...form}>
          <h1 className="mb-2 text-lg font-bold">Total : {price}</h1>
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleAddBill}>
            <SelectServices />
            <PatientInfo />
            <SelectReferrers />
            <BillPrice />
            <div className="mt-2 flex items-center justify-end gap-2 sm:col-span-2">
              <Button type="button" variant="destructive" onClick={() => form.reset()}>
                Reset Form
              </Button>
              <Button type="submit" isLoading={isPending}>
                {isPending ? 'Generating' : 'Generate Bill'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
};
