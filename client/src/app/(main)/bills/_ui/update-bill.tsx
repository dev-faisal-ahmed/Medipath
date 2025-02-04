'use client';

import { z } from 'zod';
import { QK } from '@/api-lib';
import { zodNumber } from '@/helper';
import { SelectReferrers } from '@/components/shared';
import { CommonFormFiled, FormDialog } from '@/components/shared/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePopupState } from '@/hooks';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';

export const UpdateBill = ({ billId, defaultValues }: TUpdateBillProps) => {
  const { open, onOpenChange } = usePopupState();
  const formId = `${QK.BILL}_UPDATE_${billId}`;

  const form = useForm<TUpdateBillForm>({ resolver: zodResolver(updateBillFormSchema), defaultValues });

  const onSubmit = form.handleSubmit((formData) => {
    console.log(formData);
  });

  return (
    <>
      <Button onClick={() => onOpenChange(true)}>
        <PencilIcon /> Update Bill
      </Button>
      <FormDialog
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title="Update Bill"
        description="Provide necessary information to update bill"
        submitButtonTitle="Update"
        submitLoadingTitle="Updating..."
      >
        <Form {...form}>
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <SelectReferrers />
            <CommonFormFiled control={form.control} name="visitCommission" label="Visit Commission">
              {({ field }) => <Input {...field} type="number" min={0} />}
            </CommonFormFiled>
            <CommonFormFiled control={form.control} name="referrerCommission" label="Referrer Commission">
              {({ field }) => <Input {...field} type="number" min={0} />}
            </CommonFormFiled>
            <div className="col-span-2">
              <CommonFormFiled control={form.control} name="discount" label="Discount">
                {({ field }) => <Input {...field} type="number" min={0} />}
              </CommonFormFiled>
            </div>
          </form>
        </Form>
      </FormDialog>
    </>
  );
};

// schema
const updateBillFormSchema = z.object({
  visitorId: z.string().optional(),
  referrerId: z.string().optional(),
  referrerCommission: zodNumber({ min: 0, message: 'Referrer commission can not be negative' }).optional(),
  visitCommission: zodNumber({ min: 0, message: 'Visitor commission can not be negative' }).optional(),
  discount: zodNumber({ min: 0, message: 'Discount can not be negative' }).optional(),
});

// types
type TUpdateBillForm = z.infer<typeof updateBillFormSchema>;
type TUpdateBillProps = { billId: string; defaultValues: TUpdateBillForm };
