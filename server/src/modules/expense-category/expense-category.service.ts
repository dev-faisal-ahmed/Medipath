import { AppError } from '../../utils';
import { ExpenseCategory } from './expense-category.model';
import { TAddExpenseCategoryPayload } from './expense-category.validation';

const addExpenseCategory = async (payload: TAddExpenseCategoryPayload) => {
  const isExpenseCategoryExist = await ExpenseCategory.exists({ name: payload.name });
  if (isExpenseCategoryExist) throw new AppError('Expense category already exists', 400);
  const expenseCategory = await ExpenseCategory.create(payload);
  if (!expenseCategory) throw new AppError('Expense category not created', 500);
  return 'Expense category added';
};

export const expenseCategoryService = { addExpenseCategory };
