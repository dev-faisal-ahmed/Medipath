import mongoose from 'mongoose';

import { Bill } from './bill.model';
import { billHelper } from './bill.helper';
import { AppError } from '../../utils';
import { generateMeta, getPageParams, getSearchQuery } from '../../helpers';
import { TAddBillPayload, TTakeDuePayload } from './bill.validation';
import { TRANSACTION_TYPE } from '../transaction/transaction.interface';
import { BillTransaction } from '../transaction/transaction.model';
import { TObject } from '../../utils/type';

const addBill = async (payload: TAddBillPayload) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // calculating total price for all services
    const price = payload.services.reduce((total: number, service) => {
      total += service.price;
      return total;
    }, 0);

    // validations
    const discount = payload.discount || 0;
    const referrerCommission = payload.referrerCommission || 0;
    const visitCommission = payload.visitCommission || 0;
    const paid = payload.paid || 0;

    const totalDiscountAndCommission = discount + referrerCommission + visitCommission;

    if (totalDiscountAndCommission > price)
      throw new AppError('Your price is less than the the discount and commission you have offered', 400);

    if (paid > price - discount) throw new AppError('Paying amount is more than asked', 400);

    // generating bill id
    let isBillIdMatch = true;
    let billId: string = '';

    while (isBillIdMatch) {
      billId = billHelper.generateBillId();
      const isBillIdExist = await Bill.findOne({ billId });
      if (!isBillIdExist) isBillIdMatch = false;
    }

    const [bill] = await Bill.create([{ ...payload, price, billId }], { session });
    if (!bill) throw new AppError('Failed to create bill', 400);

    // creating transactions
    const [transaction] = await BillTransaction.create(
      [
        {
          amount: payload.paid || 0,
          billId: bill._id,
          type: TRANSACTION_TYPE.REVENUE,
          description: `Collected Payment ${payload.paid} TK`,
        },
      ],
      { session },
    );

    if (!transaction) throw new AppError('Failed to create transaction', 400);
    await session.commitTransaction();

    return { billId: bill._id };
  } catch (err: any) {
    await session.abortTransaction();
    throw new AppError(err.message, 400);
  } finally {
    await session.endSession();
  }
};

const getBills = async (query: TObject) => {
  const dbQuery = { ...getSearchQuery(query, 'billId', 'patientInfo.name') };
  const { page, limit, skip } = getPageParams(query);
  const bills = await Bill.find(dbQuery).sort({ createdAt: -1 }).skip(skip).limit(limit);
  const total = await Bill.countDocuments(dbQuery);
  const meta = generateMeta({ page, limit, total });
  return { bills, meta };
};

const getBillDetails = async (billId: string) => {
  const objectId = new mongoose.Types.ObjectId(billId);

  const [billDetails] = await Bill.aggregate([
    { $match: { _id: objectId } },
    {
      $lookup: {
        from: 'referrers',
        localField: 'referrerId',
        foreignField: '_id',
        pipeline: [{ $project: { name: 1 } }],
        as: 'agent',
      },
    },
    {
      $lookup: {
        from: 'referrers',
        localField: 'visitorId',
        foreignField: '_id',
        pipeline: [{ $project: { name: 1 } }],
        as: 'doctor',
      },
    },
    { $addFields: { agent: { $arrayElemAt: ['$agent', 0] }, doctor: { $arrayElemAt: ['$doctor', 0] } } },
    { $project: { referrerCommission: 0, visitCommission: 0 } },
  ]);

  return billDetails;
};

const takeDue = async (payload: TTakeDuePayload, billId: string) => {
  const billDetails = await Bill.findOne({ _id: billId }, { paid: 1, price: 1, discount: 1 });
  if (!billDetails) throw new AppError('Bill not found', 404);

  const { paid, price, discount } = billDetails;
  const due = price - (paid || 0) - (discount || 0);
  if (due < payload.amount) throw new AppError('Due amount is less than the amount you are trying to pay', 400);

  const session = await mongoose.startSession();

  // transactions
  try {
    session.startTransaction();
    const result = await Bill.updateOne({ _id: billId }, { $inc: { paid: payload.amount } }, { session });
    if (!result.modifiedCount) throw new AppError('Failed to updated bill', 400);

    // now updating transactions
    const [transaction] = await BillTransaction.create(
      [
        {
          amount: payload.amount,
          billId: billId,
          type: TRANSACTION_TYPE.REVENUE,
          description: `Take due payment ${payload.amount} TK`,
        },
      ],
      { session },
    );

    if (!transaction) throw new AppError('Failed to create transaction', 400);

    await session.commitTransaction();

    return 'Due taken successfully';
  } catch (error) {
    await session.abortTransaction();
    let message = 'Something went wrong';
    if (error instanceof AppError) message = error.message;
    throw new AppError(message, 400);
  } finally {
    await session.endSession();
  }
};

export const billService = { addBill, getBillDetails, getBills, takeDue };
