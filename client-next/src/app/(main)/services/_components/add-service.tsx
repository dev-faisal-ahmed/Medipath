'use client';

import { QUERY_KEYS } from '@/api-lib';
import { FormDialog } from '@/components/shared/form.dialog';
import { ServiceForm, TServiceForm } from './service.form';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addService } from '@/api-lib/query';
import { toast } from 'sonner';
import { errorMessageGen } from '@/helper';

const FORM_ID = QUERY_KEYS.SERVICE + '_ADD';

export function AddService() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const onOpenChange = useCallback((open: boolean) => setOpen(open), []);

  const { mutate: addServiceMutation } = useMutation({
    mutationKey: [FORM_ID],
    mutationFn: addService,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SERVICE] });
      toast.success(response.message);
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(errorMessageGen(error));
    },
  });

  const handleAddService = (formData: TServiceForm) => {
    addServiceMutation({ ...formData, price: Number(formData.price) });
  };

  return (
    <>
      <Button onClick={() => onOpenChange(true)}>
        <PlusIcon /> Add Contact
      </Button>
      <FormDialog
        formId={FORM_ID}
        title="Add Service"
        description="Provide Service Information Give Below"
        submitButtonTitle="Add Service"
        submitLoadingTitle="Adding Service..."
        open={open}
        onOpenChange={onOpenChange}
      >
        <ServiceForm formId={FORM_ID} onSubmit={handleAddService} />
      </FormDialog>
    </>
  );
}
