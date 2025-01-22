'use client';

import { QK } from '@/api-lib';
import { FormDialog } from '@/components/shared/form';
import { usePopupState } from '@/hooks';
import { ReferrerForm, TReferrerForm } from './referrer.form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addReferrer } from '@/api-lib/query';
import { toast } from 'sonner';
import { errorMessageGen } from '@/helper';
import { ActionButton } from '@/components/ui/button';

const formId = QK.REFERRER + '_ADD';

export const AddReferrer = () => {
  const { open, onOpenChange } = usePopupState();
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: addReferrer,
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: [QK.REFERRER] });
      toast.success(res.message);
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(errorMessageGen(error));
    },
  });

  const onSubmit = (formData: TReferrerForm) => mutate({ ...formData });

  return (
    <>
      <ActionButton label="Add Referrer" actionType="ADD" onClick={() => onOpenChange(true)} />
      <FormDialog
        formId={formId}
        title="Add Referrer"
        description="Please provide information about the referrer"
        open={open}
        onOpenChange={onOpenChange}
        submitButtonTitle="Add Referrer"
        submitLoadingTitle="Adding Referrer..."
      >
        <ReferrerForm formId={formId} onSubmit={onSubmit} />
      </FormDialog>
    </>
  );
};
