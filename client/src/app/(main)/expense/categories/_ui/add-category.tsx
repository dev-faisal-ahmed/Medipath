'use client';

import { QK } from '@/api-lib';
import { toast } from 'sonner';
import { usePopupState } from '@/hooks';
import { FormDialog } from '@/components/shared/form';
import { ActionButton } from '@/components/shared';
import { CategoryForm, TCategoryForm } from './category.form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCategory } from '@/api-lib/query';
import { errorMessageGen } from '@/helper';
import { useTopbarStore } from '@/stores/topbar.store';

const formId = QK.CATEGORY + '_ADD';

export const AddCategory = () => {
  const { open, onOpenChange } = usePopupState();
  const mode = useTopbarStore((state) => state.mode);
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: addCategory,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.CATEGORY] });
      onOpenChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const handleAddExpenseCategory = (formData: TCategoryForm) => mutate({ ...formData, mode });

  return (
    <>
      <ActionButton actionType="ADD" label="Add Category" onClick={() => onOpenChange(true)} />
      <FormDialog
        formId={formId}
        title="Add Category"
        description="Please provide information about the  category"
        open={open}
        onOpenChange={onOpenChange}
        submitButtonTitle="Add Category"
        submitLoadingTitle="Adding..."
      >
        <CategoryForm formId={formId} onSubmit={handleAddExpenseCategory} />
      </FormDialog>
    </>
  );
};
