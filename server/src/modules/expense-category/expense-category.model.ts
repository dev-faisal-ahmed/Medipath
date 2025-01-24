import { IExpenseCategory } from './expense-category.interface';
import { model, Schema } from 'mongoose';
import { MODEL } from '../model-names';
import { transformJson } from '../../helpers';

const expenseCategorySchema = new Schema<IExpenseCategory>(
  {
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { transform: transformJson } },
);

export const ExpenseCategory = model<IExpenseCategory>(MODEL.EXPENSE_CATEGORY, expenseCategorySchema);
