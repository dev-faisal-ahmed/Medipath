'use client';

import { toast } from 'sonner';
import { QK } from '@/api-lib';
import { usePopupState } from '@/hooks';
import { errorMessageGen } from '@/helper';
import { FormDialog } from '@/components/shared/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReferrerForm, TReferrerForm } from './referrer.form';
import { addReferrer } from '@/api-lib/query';
import { ActionButton } from '@/components/shared';

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
    onError: (error) => toast.error(errorMessageGen(error)),
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
