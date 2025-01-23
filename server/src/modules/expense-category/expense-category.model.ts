import { IExpenseCategory } from './expense-category.interface';
import { model, Schema } from 'mongoose';
import { MODEL } from '../model-names';

const expenseCategorySchema = new Schema<IExpenseCategory>({
  name: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

export const ExpenseCategory = model<IExpenseCategory>(MODEL.EXPENSE_CATEGORY, expenseCategorySchema);
