'use client';

import { QK } from '@/api-lib';
import { deleteService } from '@/api-lib/query';
import { DeleteDialog } from '@/components/shared/delete.dialog';
import { errorMessageGen } from '@/helper';
import { usePopupState } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface IProps {
  serviceId: string;
  onActionDropdownChange(open: boolean): void;
}

export const DeleteService = ({ serviceId, onActionDropdownChange }: IProps) => {
  const { open, onOpenChange } = usePopupState();
  const qc = useQueryClient();
  const MUTATION_KEY = `${QK.SERVICE}_DELETE_${serviceId}`;

  const { mutate } = useMutation({
    mutationKey: [MUTATION_KEY],
    mutationFn: deleteService,
    onSuccess: (response) => {
      qc.invalidateQueries({ queryKey: [QK.SERVICE] });
      toast.success(response.message);
      onOpenChange(false);
      onActionDropdownChange(false);
    },
    onError: (error) => {
      toast.error(errorMessageGen(error));
    },
  });

  return (
    <DeleteDialog
      mutationKey={MUTATION_KEY}
      title="Delete Service"
      description="Once you delete this service you can be found in trash"
      onDelete={() => mutate(serviceId)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
};
