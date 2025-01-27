'use client';

import { z } from 'zod';
import { QK } from '@/api-lib';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorMessageGen, zodNumber } from '@/helper';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommonFormFiled, FormDialog } from '../form';
import { usePopupState } from '@/hooks';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { giveCommission } from '@/api-lib/query';
import { ActionButton } from '../action-button';

export const GiveCommission = ({ billId, referrerId, buttonLabel, disabled }: TGiveCommissionProps) => {
  const formId = `${QK.BILL}_GIVE_COMMISSION_${billId}`;
  const { open, onOpenChange } = usePopupState();
  const qc = useQueryClient();

  const form = useForm<TGiveCommissionForm>({
    resolver: zodResolver(giveCommissionFormSchema),
    defaultValues: { amount: '' },
  });

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: giveCommission,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.BILL] });
      onOpenChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const handleGiveCommission = form.handleSubmit((formData: TGiveCommissionForm) => {
    mutate({ amount: Number(formData.amount), billId, referrerId });
  });

  return (
    <>
      <ActionButton actionType="PAYMENT" label={buttonLabel} onClick={() => onOpenChange(true)} disabled={disabled} />
      <FormDialog
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title="Give Commission"
        description="Provide amount to give commission"
        submitButtonTitle="Proceed"
        submitLoadingTitle="Pending..."
      >
        <Form {...form}>
          <form id={formId} onSubmit={handleGiveCommission}>
            <CommonFormFiled control={form.control} name="amount" label="Amount">
              {({ field }) => <Input {...field} placeholder="Input amount" type="number" />}
            </CommonFormFiled>
          </form>
        </Form>
      </FormDialog>
    </>
  );
};

const giveCommissionFormSchema = z.object({
  amount: zodNumber({ min: 0, message: 'Amount can not be negative' }),
});

// types
type TGiveCommissionProps = {
  billId: string;
  referrerId: string;
  buttonLabel: string;
  disabled?: boolean;
};

type TGiveCommissionForm = z.infer<typeof giveCommissionFormSchema>;
