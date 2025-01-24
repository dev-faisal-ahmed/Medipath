'use client';

import { QK } from '@/api-lib';
import { toast } from 'sonner';
import { usePopupState } from '@/hooks';
import { FormDialog } from '@/components/shared/form';
import { ActionButton } from '@/components/ui/button';
import { ExpenseCategoryForm, TExpenseCategoryForm } from './expense-category.form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addExpenseCategory } from '@/api-lib/query';
import { errorMessageGen } from '@/helper';

const formId = QK.EXPENSE_CATEGORY + '_ADD';

export const AddExpenseCategory = () => {
  const { open, onOpenChange } = usePopupState();
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: addExpenseCategory,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.EXPENSE_CATEGORY] });
      onOpenChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const handleAddExpenseCategory = (formData: TExpenseCategoryForm) => mutate({ ...formData });

  return (
    <>
      <ActionButton actionType="ADD" label="Add Expense Category" onClick={() => onOpenChange(true)} />
      <FormDialog
        formId={formId}
        title="Add Expense Category"
        description="Please provide information about the expense category"
        open={open}
        onOpenChange={onOpenChange}
        submitButtonTitle="Add Category"
        submitLoadingTitle="Adding..."
      >
        <ExpenseCategoryForm formId={formId} onSubmit={handleAddExpenseCategory} />
      </FormDialog>
    </>
  );
};
