import { z } from 'zod';
import { zodMongoObjectId } from '../../helpers';
import { MODE } from '../../utils/type';

const addExpenseSchema = z.object({
  amount: z.number().positive({ message: 'Amount cannot be negative' }),
  date: z.string().date('Invalid date').optional(),
  description: z.string().optional(),
  categoryId: zodMongoObjectId('Invalid category id'),
  mode: z.nativeEnum(MODE, { message: 'Invalid mode' }),
});

export const transactionValidation = { addExpenseSchema };

export type TAddExpensePayload = z.infer<typeof addExpenseSchema>;
