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
    {
      $facet: {
        firstExpense: [{ $match: dbQuery }, { $sort: { date: 1 } }, { $limit: 1 }],
        lastExpense: [{ $match: dbQuery }, { $sort: { date: -1 } }, { $limit: 1 }],
        expenses: [
          { $match: { ...dbQuery, date: getMonthRangeQuery(year, month) } },
          { $lookup: { from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'category' } },
          { $addFields: { categoryName: { $arrayElemAt: ['$category.name', 0] }, id: '$_id' } },
          { $project: { _id: 0, __v: 0, category: 0, createdAt: 0, updatedAt: 0 } },
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

  const firstExpenseDate = result?.firstExpenseDate || new Date();
  const lastExpenseDate = result?.lastExpenseDate || new Date();
  const expenses = result?.expenses;

  return { firstExpenseDate, lastExpenseDate, expenses };
};

const getReferrerExpenses = async (query: TObject) => {
  const dateTime = query.dateTime;
  const date = parseDate(dateTime);
  const month = date.getMonth();
  const year = date.getFullYear();
  const referrerType = query.referrerType || REFERRER_TYPE.AGENT;

  const [result] = await Transaction.aggregate([
    {
      $facet: {
        firstTransaction: [
          { $lookup: { from: 'referrers', localField: 'referrerId', foreignField: '_id', as: 'referrer' } },
          { $unwind: '$referrer' },
          { $match: { 'referrer.type': referrerType } },
          { $sort: { date: -1 } },
          { $limit: 1 },
        ],
        lastTransaction: [
          { $lookup: { from: 'referrers', localField: 'referrerId', foreignField: '_id', as: 'referrer' } },
          { $unwind: '$referrer' },
          { $match: { 'referrer.type': referrerType } },
          { $sort: { date: 1 } },
          { $limit: 1 },
        ],
        transactions: [
          { $match: { categoryType: 'referrer-transaction', date: getMonthRangeQuery(year, month) } },
          {
            $lookup: {
              from: 'referrers',
              localField: 'referrerId',
              foreignField: '_id',
              as: 'referrer',
              pipeline: [{ $project: { id: '$_id', type: 1, _id: 0, name: 1, designation: 1 } }],
            },
          },
          { $unwind: { path: '$referrer' } },
          { $match: { 'referrer.type': 'DOCTOR' } },
          { $addFields: { id: '$_id' } },
          { $project: { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 } },
        ],
      },
    },
    {
      $project: {
        firstTransactionDate: { $arrayElemAt: ['$firstTransaction.date', 0] },
        lastTransactionDate: { $arrayElemAt: ['$lastTransaction.date', 0] },
        transactions: '$transactions',
      },
    },
  ]);

  const firstTransactionDate = result?.firstTransactionDate || new Date();
  const lastTransactionDate = result?.lastTransactionDate || new Date();
  const transactions = result?.transactions;

  return { firstTransactionDate, lastTransactionDate, transactions };
};

export const transactionService = { addExpense, getMonthlyExpenses, getReferrerExpenses };
