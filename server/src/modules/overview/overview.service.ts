import { MODE, TObject } from '../../utils/type';
import { Transaction } from '../transaction/transaction.model';

enum OVERVIEW_TYPE {
  DAILY = 'daily',
  MONTHLY = 'monthly',
}

const getOverview = async (query: TObject) => {
  const type = query.type || OVERVIEW_TYPE.DAILY;
  const dateTime = query.dataTime;
  const mode = query.mode || MODE.PATHOLOGY;

  const [result] = await Transaction.aggregate([
    {
      $facet: {
        totalCollection: [{ $match: { type: 'REVENUE' } }, { $group: { _id: null, total: { $sum: '$amount' } } }],
        expenses: [
          { $match: { categoryType: 'utility-transaction' } },
          { $group: { _id: null, total: { $sum: '$amount' } } },
        ],
        referrerExpense: [
          { $match: { categoryType: 'referrer-transaction' } },
          { $lookup: { from: 'referrers', localField: 'referrerId', foreignField: '_id', as: 'referrer' } },
          { $unwind: '$referrer' },
          { $group: { _id: '$referrer.type', total: { $sum: '$amount' } } },
        ],
      },
    },
    {
      $project: {
        totalCollection: { $arrayElemAt: ['$totalCollection.total', 0] },
        utilityExpense: { $arrayElemAt: ['$expenses.total', 0] },
        referrerExpense: '$referrerExpense',
      },
    },
  ]);

  const referrerExpense = { referredExpense: 0, doctorsPcExpense: 0 };

  const totalCollection = result?.totalCollection || 0;
  const utilityExpense = result?.utilityExpense || 0;

  result?.referrerExpense?.forEach((expense: { _id: string; total: number }) => {
    if (expense._id === 'AGENT') referrerExpense.referredExpense = expense.total;
    else if (expense._id === 'DOCTOR') referrerExpense.doctorsPcExpense = expense.total;
  });

  const { referredExpense, doctorsPcExpense } = referrerExpense;

  return { transactions: { totalCollection, utilityExpense, referredExpense, doctorsPcExpense } };
};

export const overviewService = { getOverview };
