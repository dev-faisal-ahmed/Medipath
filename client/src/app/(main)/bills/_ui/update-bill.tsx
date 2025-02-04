'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { QK } from '@/api-lib';
import { PencilIcon } from 'lucide-react';
import { CommonFormFiled, FormDialog } from '@/components/shared/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorMessageGen, zodNumber } from '@/helper';
import { SelectReferrers } from '@/components/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateBill } from '@/api-lib/query';
import { Button } from '@/components/ui/button';
import { usePopupState } from '@/hooks';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const UpdateBill = ({ billId, defaultValues, onActionChange }: TUpdateBillProps) => {
  const qc = useQueryClient();
  const formId = `${QK.BILL}_UPDATE_${billId}`;
  const { open, onOpenChange } = usePopupState();

  const form = useForm<TUpdateBillForm>({ resolver: zodResolver(updateBillFormSchema), defaultValues });

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: updateBill,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.BILL] });
      qc.invalidateQueries({ queryKey: [QK.OVERVIEW] });
      qc.invalidateQueries({ queryKey: [QK.REFERRER] });
      onOpenChange(false);
      onActionChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const onSubmit = form.handleSubmit((formData) => {
    mutate({
      id: billId,
      ...formData,
      discount: Number(formData.discount),
      visitCommission: Number(formData.visitCommission),
      referrerCommission: Number(formData.referrerCommission),
    });
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
          <form id={formId} onSubmit={onSubmit} className="flex flex-col gap-3">
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
type TUpdateBillProps = { billId: string; defaultValues: TUpdateBillForm; onActionChange(open: boolean): void };
