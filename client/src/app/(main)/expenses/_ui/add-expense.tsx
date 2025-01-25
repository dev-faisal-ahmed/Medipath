'use client';

import { QK } from '@/api-lib';
import { toast } from 'sonner';
import { addExpense } from '@/api-lib/query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ActionButton } from '@/components/ui/button';
import { errorMessageGen } from '@/helper';
import { usePopupState } from '@/hooks';
import { FormDialog } from '@/components/shared/form';
import { ExpenseForm, TExpenseForm } from './expense.form';
import { useTopbarStore } from '@/stores/topbar';

const formId = QK.EXPENSE + '_ADD';

export const AddExpense = () => {
  const { open, onOpenChange } = usePopupState();
  const qc = useQueryClient();
  const mode = useTopbarStore((state) => state.mode);

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: addExpense,
    onSuccess: (res) => {
      toast.success(res.message);
      onOpenChange(false);
      qc.invalidateQueries({ queryKey: [QK.EXPENSE] });
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const handleAddExpense = (formData: TExpenseForm) => mutate({ ...formData, mode, amount: Number(formData.amount) });

  return (
    <>
      <ActionButton label="Add Expense" actionType="ADD" onClick={() => onOpenChange(true)} />
      <FormDialog
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title="Add Expense"
        description="Provide following details to add expense"
        submitButtonTitle="Add Expense"
        submitLoadingTitle="Adding Expense..."
      >
        <ExpenseForm formId={formId} onSubmit={handleAddExpense} />
      </FormDialog>
    </>
  );
};
