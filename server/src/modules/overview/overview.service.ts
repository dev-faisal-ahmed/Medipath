import { Bill } from '../bill/bill.model';
import { MODE, TObject } from '../../utils/type';
import { getDateRangeQuery, getMonthRangeQuery, parseDate } from '../../helpers';
import { TRANSACTION_CATEGORY_TYPE } from '../transaction/constants';
import { TRANSACTION_TYPE } from '../transaction/transaction.interface';
import { Transaction } from '../transaction/transaction.model';

enum OVERVIEW_TYPE {
  DAILY = 'daily',
  MONTHLY = 'monthly',
}

const getOverview = async (query: TObject) => {
  const type = query.type || OVERVIEW_TYPE.DAILY;
  const dateTime = query.dataTime;
  const mode = query.mode || MODE.PATHOLOGY;

  const date = parseDate(dateTime);
  const year = date.getFullYear();
  const month = date.getMonth();

  const dateQuery = {
    date: type === OVERVIEW_TYPE.DAILY ? getDateRangeQuery(date) : getMonthRangeQuery(year, month),
  };

  const [transactionResult] = await Transaction.aggregate([
    { $match: dateQuery },
    {
      $facet: {
        totalCollection: [
          { $match: { type: TRANSACTION_TYPE.REVENUE } },
          { $group: { _id: null, total: { $sum: '$amount' } } },
        ],
        expenses: [
          { $match: { categoryType: TRANSACTION_CATEGORY_TYPE.UTILITY_TRANSACTION, mode } },
          { $group: { _id: null, total: { $sum: '$amount' } } },
        ],
        referrerExpense: [
          { $match: { categoryType: TRANSACTION_CATEGORY_TYPE.REFERRER_TRANSACTION } },
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

  const [billResult] = await Bill.aggregate([
    { $match: dateQuery },
    {
      $lookup: {
        from: 'referrers',
        localField: 'referrerId',
        foreignField: '_id',
        as: 'agent',
        pipeline: [{ $project: { name: 1, designation: 1, id: '$_id', _id: 0 } }],
      },
    },
    {
      $lookup: {
        from: 'referrers',
        localField: 'visitorId',
        foreignField: '_id',
        as: 'doctor',
        pipeline: [{ $project: { name: 1, designation: 1, id: '$_id', _id: 0 } }],
      },
    },
    { $addFields: { id: '$_id', agent: { $arrayElemAt: ['$agent', 0] }, doctor: { $arrayElemAt: ['$doctor', 0] } } },
    { $project: { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 } },
    {
      $facet: {
        bills: [{ $sort: { date: -1 } }, { $limit: 20 }],
        overview: [
          {
            $group: {
              _id: null,
              revenue: { $sum: '$price' },
              due: { $sum: { $subtract: [{ $subtract: ['$price', '$discount'] }, '$paid'] } },
              referredCommissionToPay: { $sum: '$referrerCommission' },
              doctorPcCommissionToPay: { $sum: '$visitCommission' },
            },
          },
        ],
      },
    },
    { $project: { bills: '$bills', overview: { $arrayElemAt: ['$overview', 0] } } },
  ]);

  const referrerExpense = { referredExpense: 0, doctorsPcExpense: 0 };
  const totalCollection = transactionResult?.totalCollection || 0;
  const utilityExpense = transactionResult?.utilityExpense || 0;
  const revenue = billResult?.overview?.revenue || 0;
  const due = billResult?.overview?.due || 0;
  const referredCommissionToPay = billResult?.overview?.referredCommissionToPay || 0;
  const doctorPcCommissionToPay = billResult?.overview?.doctorPcCommissionToPay || 0;
  const bills = billResult?.bills || [];

  // generating referrer expense
  transactionResult?.referrerExpense?.forEach((expense: { _id: string; total: number }) => {
    if (expense._id === 'AGENT') referrerExpense.referredExpense = expense.total;
    else if (expense._id === 'DOCTOR') referrerExpense.doctorsPcExpense = expense.total;
  });

  const { referredExpense, doctorsPcExpense } = referrerExpense;

  return {
    totalCollection,
    utilityExpense,
    referredExpense,
    doctorsPcExpense,
    revenue,
    due,
    referredCommissionToPay,
    doctorPcCommissionToPay,
    bills,
  };
};

export const overviewService = { getOverview };
