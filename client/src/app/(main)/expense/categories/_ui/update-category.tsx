'use client';

import { QK } from '@/api-lib';
import { usePopupState } from '@/hooks';
import { Button } from '@/components/ui/button';
import { FormDialog } from '@/components/shared/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCategory } from '@/api-lib/query';
import { TCategory } from '@/types';
import { PenLineIcon } from 'lucide-react';
import { CategoryForm, TCategoryForm } from './category.form';
import { toast } from 'sonner';
import { errorMessageGen } from '@/helper';

export const UpdateCategory = ({ id, name }: TUpdateCategoryProps) => {
  const { open, onOpenChange } = usePopupState();
  const formId = `${QK.CATEGORY}_UPDATE_${id}`;
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: updateCategory,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.CATEGORY] });
      onOpenChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const handleUpdateCategory = (formData: TCategoryForm) => mutate({ id, ...formData });

  return (
    <>
      <Button size="icon" onClick={() => onOpenChange(true)}>
        <PenLineIcon />
      </Button>
      <FormDialog
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title="Update Category"
        description="Please provide the following information to update category"
        submitButtonTitle="Update"
        submitLoadingTitle="Updating..."
      >
        <CategoryForm defaultValues={{ name }} formId={formId} onSubmit={handleUpdateCategory} />
      </FormDialog>
    </>
  );
};

type TUpdateCategoryProps = {
  name: TCategory['name'];
  id: TCategory['id'];
};
