'use client';

import { z } from 'zod';
import { QK } from '@/api-lib';
import { toast } from 'sonner';
import { usePopupState } from '@/hooks';
import { errorMessageGen, zodNumber } from '@/helper';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CommonFormFiled, FormDialog } from '@/components/shared/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { takeDue } from '@/api-lib/query';
import { PencilIcon } from 'lucide-react';

export const TakeDue = ({ billId }: { billId: string }) => {
  const form = useForm<TTakeDueForm>({ resolver: zodResolver(takeDueSchema), defaultValues: { amount: '' } });
  const formId = `${QK.BILL}_TAKE_DUE_${billId}`;

  const { open, onOpenChange } = usePopupState();
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: takeDue,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.BILL] });
      onOpenChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const handleTakeDue = form.handleSubmit((formData) => {
    mutate({ billId, amount: Number(formData.amount) });
  });

  return (
    <>
      <Button className="w-full" onClick={() => onOpenChange(true)}>
        <PencilIcon className="size-4" /> Take Due
      </Button>

      <FormDialog
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title="Take Due"
        description="Please provide the amount to take due"
        submitButtonTitle="Take Due"
        submitLoadingTitle="Taking Due..."
      >
        <Form {...form}>
          <form id={formId} onSubmit={handleTakeDue}>
            <CommonFormFiled control={form.control} name="amount" label="Amount">
              {({ field }) => <Input type="number" placeholder="Input amount" {...field} />}
            </CommonFormFiled>
          </form>
        </Form>
      </FormDialog>
    </>
  );
};

const takeDueSchema = z.object({ amount: zodNumber({ min: 0, message: 'Amount can not be negative' }) });
type TTakeDueForm = z.infer<typeof takeDueSchema>;
