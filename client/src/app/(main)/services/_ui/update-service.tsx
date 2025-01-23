'use client';

import { ActionButton } from '@/components/ui/button';
import { IService } from '@/types';
import { ServiceForm, TServiceForm } from './service.form';
import { QK } from '@/api-lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateService } from '@/api-lib/query';
import { toast } from 'sonner';
import { errorMessageGen } from '@/helper';
import { FormDialog } from '@/components/shared/form';
import { usePopupState } from '@/hooks';

interface IProps {
  service: IService;
  onActionDropdownChange(open: boolean): void;
}

export const UpdateService = ({ service, onActionDropdownChange }: IProps) => {
  const formId = `${QK.SERVICE}_UPDATE_${service._id}`;
  const { open, onOpenChange } = usePopupState();

  const qc = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: updateService,
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: [QK.SERVICE] });
      toast.success(res.message);
      onOpenChange(false);
      onActionDropdownChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const handleUpdateService = (formData: TServiceForm) => {
    const price = Number(formData.price);
    const serviceId = service._id;

    mutate({ _id: serviceId, ...formData, price });
  };

  return (
    <>
      <ActionButton label="Update Service" actionType="UPDATE" onClick={() => onOpenChange(true)} />
      <FormDialog
        formId={formId}
        title="Update Service"
        description="Provide necessary information to update service"
        open={open}
        onOpenChange={onOpenChange}
        submitButtonTitle="Update Service"
        submitLoadingTitle="Updating Service..."
      >
        <ServiceForm
          formId={formId}
          onSubmit={handleUpdateService}
          defaultValues={{ ...service, price: service.price.toString() }}
        />
      </FormDialog>
    </>
  );
};
