import { TObject } from '../../utils/type';
import { TRANSACTION_TYPE } from './transaction.interface';
import { getMonthRangeQuery, parseDate } from '../../helpers';
import { UtilityExpenseTransaction } from './transaction.model';
import { TAddExpensePayload } from './transaction.validation';
import { TRANSACTION_CATEGORY_TYPE } from '../model-names';

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

  const dbQuery = {
    categoryType: TRANSACTION_CATEGORY_TYPE.UTILITY_TRANSACTION,
    mode,
  };

  const [result] = await UtilityExpenseTransaction.aggregate([
    {
      $facet: {
        firstExpense: [{ $match: dbQuery }, { $sort: { createdAt: 1 } }, { $limit: 1 }],
        lastExpense: [{ $match: dbQuery }, { $sort: { createdAt: -1 } }, { $limit: 1 }],
        expenses: [
          { $match: { ...dbQuery, date: getMonthRangeQuery(year, month) } },
          { $lookup: { from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'category' } },
          { $addFields: { categoryName: { $arrayElemAt: ['$category.name', 0] }, id: '$_id' } },
          { $project: { category: 0, __v: 0, createdAt: 0, updatedAt: 0 } },
        ],
      },
    },
    {
      $project: {
        firstExpenseDate: { $arrayElemAt: ['$firstExpense.date', 0] },
        lastExpenseDate: { $arrayElemAt: ['$lastExpense.date', 0] },
        expenses: '$expenses',
      },
    },
  ]);

  const expenses = result?.expenses;
  const firstExpenseDate = result?.firstExpenseDate || new Date();
  const lastExpenseDate = result?.lastExpenseDate || new Date();

  return { expenses, firstExpenseDate, lastExpenseDate };
};

export const transactionService = { addExpense, getMonthlyExpenses };
