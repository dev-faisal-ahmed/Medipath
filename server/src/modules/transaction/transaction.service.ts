import { TObject } from '../../utils/type';
import { TRANSACTION_TYPE } from './transaction.interface';
import { getMonthRangeQuery, parseDate } from '../../helpers';
import { Transaction, UtilityExpenseTransaction } from './transaction.model';
import { TAddExpensePayload } from './transaction.validation';
import { TRANSACTION_CATEGORY_TYPE } from './constants';
import { REFERRER_TYPE } from '../referrer/referrer.interface';

const addExpense = async (payload: TAddExpensePayload) => {
  await UtilityExpenseTransaction.create({ ...payload, type: TRANSACTION_TYPE.EXPENSE });
  return 'Expense Added';
};

const getMonthlyExpenses = async (query: TObject) => {
  const mode = query.mode;
  const dateTime = query.dateTime;
  const date = parseDate(dateTime);
  const month = date.getMonth();
  const year = date.getFullYear();

  const dbQuery = {
    categoryType: TRANSACTION_CATEGORY_TYPE.UTILITY_TRANSACTION,
    mode,
  };

  const [result] = await UtilityExpenseTransaction.aggregate([
    { $match: dbQuery },
    {
      $facet: {
        firstExpense: [{ $sort: { date: 1 } }, { $limit: 1 }],
        lastExpense: [{ $sort: { date: -1 } }, { $limit: 1 }],
        expenses: [
          { $match: { date: getMonthRangeQuery(year, month) } },
          { $lookup: { from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'category' } },
          { $addFields: { id: '$_id', categoryName: { $arrayElemAt: ['$category.name', 0] } } },
          { $project: { _id: 0, __v: 0, category: 0, createdAt: 0, updatedAt: 0 } },
        ],
        total: [
          { $match: { date: getMonthRangeQuery(year, month) } },
          { $group: { _id: null, total: { $sum: '$amount' } } },
        ],
      },
    },
    {
      $project: {
        firstExpenseDate: { $arrayElemAt: ['$firstExpense.date', 0] },
        lastExpenseDate: { $arrayElemAt: ['$lastExpense.date', 0] },
        total: { $arrayElemAt: ['$total.total', 0] },
        expenses: '$expenses',
      },
    },
  ]);

  const firstExpenseDate = result?.firstExpenseDate || new Date();
  const lastExpenseDate = result?.lastExpenseDate || new Date();
  const total = result.total || 0;
  const expenses = result?.expenses;

  return { firstExpenseDate, lastExpenseDate, total, expenses };
};

const getReferrerExpenses = async (query: TObject) => {
  const dateTime = query.dateTime;
  const date = parseDate(dateTime);
  const month = date.getMonth();
  const year = date.getFullYear();
  const referrerType = query.referrerType || REFERRER_TYPE.AGENT;

  const [result] = await Transaction.aggregate([
    { $match: { categoryType: TRANSACTION_CATEGORY_TYPE.REFERRER_TRANSACTION } },
    {
      $lookup: {
        from: 'referrers',
        localField: 'referrerId',
        foreignField: '_id',
        as: 'referrer',
        pipeline: [{ $project: { id: '$_id', type: 1, _id: 0, name: 1, designation: 1 } }],
      },
    },
    { $unwind: '$referrer' },
    { $match: { 'referrer.type': referrerType } },
    {
      $facet: {
        firstTransaction: [{ $sort: { date: 1 } }, { $limit: 1 }],
        lastTransaction: [{ $sort: { date: -1 } }, { $limit: 1 }],
        transactions: [
          { $match: { date: getMonthRangeQuery(year, month) } },
          { $addFields: { id: '$_id' } },
          {
            $project: {
              _id: 0,
              __v: 0,
              createdAt: 0,
              updatedAt: 0,
              type: 0,
              categoryType: 0,
              billId: 0,
              referrerId: 0,
            },
          },
        ],
        total: [
          { $match: { date: getMonthRangeQuery(year, month) } },
          { $group: { _id: null, total: { $sum: '$amount' } } },
        ],
      },
    },
    {
      $project: {
        firstTransactionDate: { $arrayElemAt: ['$firstTransaction.date', 0] },
        lastTransactionDate: { $arrayElemAt: ['$lastTransaction.date', 0] },
        total: { $arrayElemAt: ['$total.total', 0] },
        transactions: '$transactions',
      },
    },
  ]);

  const firstTransactionDate = result?.firstTransactionDate || new Date();
  const lastTransactionDate = result?.lastTransactionDate || new Date();
  const total = result.total || 0;
  const transactions = result?.transactions;

  return { firstTransactionDate, lastTransactionDate, total, transactions };
};

export const transactionService = { addExpense, getMonthlyExpenses, getReferrerExpenses };
