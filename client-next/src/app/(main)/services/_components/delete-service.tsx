'use client';

import { QUERY_KEYS } from '@/api-lib';
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

export function DeleteService({ serviceId, onActionDropdownChange }: IProps) {
  const { open, onOpenChange } = usePopupState();
  const queryClient = useQueryClient();
  const MUTATION_KEY = `${QUERY_KEYS.SERVICE}_DELETE_${serviceId}`;

  const { mutate } = useMutation({
    mutationKey: [MUTATION_KEY],
    mutationFn: deleteService,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SERVICE] });
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
}
