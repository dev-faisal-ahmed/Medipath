'use client';

import { QK } from '@/api-lib';
import { deleteCategory } from '@/api-lib/query';
import { DeleteDialog } from '@/components/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorMessageGen } from '@/helper';
import { usePopupState } from '@/hooks';
import { TCategory } from '@/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';

export const DeleteCategory = ({ categoryId }: TDeleteCategoryProps) => {
  const { open, onOpenChange } = usePopupState();
  const qc = useQueryClient();
  const mutationKey = `${QK.CATEGORY}_DELETE_${categoryId}`;

  const { mutate } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: deleteCategory,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.CATEGORY] });
      onOpenChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  return (
    <>
      <DeleteDialog
        open={open}
        onOpenChange={onOpenChange}
        mutationKey={mutationKey}
        onDelete={() => mutate(categoryId)}
        title="Delete Category"
        description="Are you sure to delete this category once you delete it, can be found in trash"
        triggerButton={
          <Button size="icon" variant="destructive">
            <TrashIcon />
          </Button>
        }
      />
    </>
  );
};

type TDeleteCategoryProps = { categoryId: TCategory['id'] };
