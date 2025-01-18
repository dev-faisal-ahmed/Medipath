import mongoose from 'mongoose';

import { TAddBillPayload } from './bill.validation';
import { AppError } from '../../utils';
import { billHelper } from './bill.helper';
import { Bill } from './bill.model';
import { Transaction } from '../transaction/transaction.model';
import { TRANSACTION_CATEGORY, TRANSACTION_TYPE } from '../transaction/transaction.interface';

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
    const [transaction] = await Transaction.create(
      [
        {
          amount: payload.paid || 0,
          billId: bill._id,
          category: TRANSACTION_CATEGORY.SERVICE_REVENUE,
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

export const billService = { addBill };
