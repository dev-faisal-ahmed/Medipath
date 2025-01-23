import { z } from 'zod';

const addExpenseCategory = z.object({ name: z.string().min(1, { message: 'Category name is required' }) });

export const expenseCategoryValidation = { addExpenseCategory };

export type TAddExpenseCategoryPayload = z.infer<typeof addExpenseCategory>;
