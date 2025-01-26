'use client';

import { QK } from '@/api-lib';
import { FormDialog } from '@/components/shared/form';
import { usePopupState } from '@/hooks';
import { ReferrerForm, TReferrerForm } from './referrer.form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateReferrer } from '@/api-lib/query';
import { toast } from 'sonner';
import { errorMessageGen } from '@/helper';
import { ActionButton } from '@/components/ui/button';

export const UpdateReferrer = ({ referrer, onActionDropdownChange }: TUpdateReferrerProps) => {
  const { open, onOpenChange } = usePopupState();
  const qc = useQueryClient();
  const formId = `${QK.REFERRER}_UPDATE_${referrer.id}`;

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: updateReferrer,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.REFERRER] });
      onOpenChange(false);
      onActionDropdownChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const onUpdateReferrer = (formData: TReferrerForm) => {
    mutate({ ...formData, id: referrer.id });
  };

  return (
    <>
      <ActionButton label="Update" actionType="UPDATE" onClick={() => onOpenChange(true)} />
      <FormDialog
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title="Update Referrer"
        description="Provide necessary information to update referrer"
        submitButtonTitle="Update Referrer"
        submitLoadingTitle="Updating Referrer"
      >
        <ReferrerForm
          formId={formId}
          onSubmit={onUpdateReferrer}
          defaultValues={{
            name: referrer.name,
            type: referrer.type,
            phone: referrer.phone,
            designation: referrer.designation,
          }}
        />
      </FormDialog>
    </>
  );
};

type TUpdateReferrerProps = { referrer: TReferrerForm & { id: string }; onActionDropdownChange(open: boolean): void };
