import { TObject } from '../../utils/type';
import { TRANSACTION_TYPE } from './transaction.interface';
import { getMonthRangeQuery, parseDate } from '../../helpers';
import { UtilityExpenseTransaction } from './transaction.model';
import { TAddExpensePayload } from './transaction.validation';

const addExpense = async (payload: TAddExpensePayload) => {
  await UtilityExpenseTransaction.create({ ...payload, type: TRANSACTION_TYPE.EXPENSE });
  return 'Expense Added';
};

const getMonthlyExpenses = async (query: TObject) => {
  const mode = query.mode;
  const dateTime = query['date-time'];
  const date = parseDate(dateTime);
  const month = date.getMonth();
  const year = date.getFullYear();

  const expenses = await UtilityExpenseTransaction.find({ date: getMonthRangeQuery(year, month), mode });

  // also we need to find first expense of the system
  const firstExpense = await UtilityExpenseTransaction.findOne({ mode }, { date: 1 }).sort({ createdAt: 1 });
  const firstExpenseDate = firstExpense?.createdAt || new Date();

  return { expenses, firstExpenseDate };
};

export const transactionService = { addExpense, getMonthlyExpenses };
