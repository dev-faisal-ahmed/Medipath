import { TRANSACTION_TYPE } from './transaction.interface';
import { UtilityExpenseTransaction } from './transaction.model';
import { TAddExpensePayload } from './transaction.validation';

const addExpense = async (payload: TAddExpensePayload) => {
  await UtilityExpenseTransaction.create({ ...payload, type: TRANSACTION_TYPE.EXPENSE });
  return 'Expense Added';
};

export const transactionService = { addExpense };
