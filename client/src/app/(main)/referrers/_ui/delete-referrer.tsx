'use client';

import { QK } from '@/api-lib';
import { deleteReferrer } from '@/api-lib/query';
import { DeleteDialog } from '@/components/shared';
import { errorMessageGen } from '@/helper';
import { usePopupState } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface IProps {
  referrerId: string;
  onActionDropdownChange(open: boolean): void;
}

export const DeleteReferrer = ({ referrerId, onActionDropdownChange }: IProps) => {
  const mutationKey = `${QK.REFERRER}_DELETE_${referrerId}`;

  const { open, onOpenChange } = usePopupState();
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: deleteReferrer,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.REFERRER] });
      onActionDropdownChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  return (
    <DeleteDialog
      open={open}
      onOpenChange={onOpenChange}
      mutationKey={mutationKey}
      title="Delete Referrer"
      description="Once you have deleted a referrer, it can be found in trash page"
      onDelete={() => mutate(referrerId)}
    />
  );
};
