'use client';

import { Button } from '@/components/ui/button';
import { IService } from '@/types';
import { PenLineIcon } from 'lucide-react';
import { ServiceForm, TServiceForm } from './service.form';
import { QUERY_KEYS } from '@/api-lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateService } from '@/api-lib/query';
import { toast } from 'sonner';
import { errorMessageGen } from '@/helper';
import { FormDialog } from '@/components/shared/form/form.dialog';
import { usePopupState } from '@/hooks';

interface IProps {
  service: IService;
  onActionDropdownChange(open: boolean): void;
}

export function UpdateService({ service, onActionDropdownChange }: IProps) {
  const FORM_ID = `${QUERY_KEYS.SERVICE}_UPDATE_${service._id}`;
  const { open, onOpenChange } = usePopupState();

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: [FORM_ID],
    mutationFn: updateService,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SERVICE] });
      toast.success(res.message);
      onOpenChange(false);
      onActionDropdownChange(false);
    },
    onError: (error) => {
      toast.error(errorMessageGen(error));
    },
  });

  const handleUpdateService = (formData: TServiceForm) => {
    mutate({ _id: service._id, ...formData, price: Number(formData.price) });
  };

  return (
    <>
      <Button onClick={() => onOpenChange(true)} className="justify-start" variant="primary_ghost">
        <PenLineIcon /> Update
      </Button>
      <FormDialog
        formId={FORM_ID}
        title="Update Service"
        description="Provide necessary information to update service"
        open={open}
        onOpenChange={onOpenChange}
        submitButtonTitle="Update Service"
        submitLoadingTitle="Updating Service..."
      >
        <ServiceForm
          formId={FORM_ID}
          onSubmit={handleUpdateService}
          defaultValues={{ ...service, price: service.price.toString() }}
        />
      </FormDialog>
    </>
  );
}
