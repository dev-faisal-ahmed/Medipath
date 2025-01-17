'use client';

import { QK } from '@/api-lib';
import { FormDialog } from '@/components/shared/form';
import { ServiceForm, TServiceForm } from './service.form';
import { ActionButton } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addService } from '@/api-lib/query';
import { toast } from 'sonner';
import { errorMessageGen } from '@/helper';
import { usePopupState } from '@/hooks';

const formId = QK.SERVICE + '_ADD';

export const AddService = () => {
  const qc = useQueryClient();
  const { open, onOpenChange } = usePopupState();

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: addService,
    onSuccess: (response) => {
      qc.invalidateQueries({ queryKey: [QK.SERVICE] });
      toast.success(response.message);
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(errorMessageGen(error));
    },
  });

  const handleAddService = (formData: TServiceForm) => mutate({ ...formData, price: Number(formData.price) });

  return (
    <>
      <ActionButton label="Add Service" actionType="ADD" onClick={() => onOpenChange(true)} />
      <FormDialog
        formId={formId}
        title="Add Service"
        description="Provide service information to add one"
        submitButtonTitle="Add Service"
        submitLoadingTitle="Adding Service..."
        open={open}
        onOpenChange={onOpenChange}
      >
        <ServiceForm formId={formId} onSubmit={handleAddService} />
      </FormDialog>
    </>
  );
};
