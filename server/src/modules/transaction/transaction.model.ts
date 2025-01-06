import { model, Schema } from 'mongoose';
import { ITransaction, TRANSACTION_TYPE } from './transaction.interface';

const transactionSchema = new Schema<ITransaction>({
  billId: { type: Schema.Types.ObjectId, ref: 'bill' },
  referrerId: { type: Schema.Types.ObjectId, ref: 'referrer' },
  type: { type: String, enum: Object.values(TRANSACTION_TYPE), required: true },
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, default: new Date() },
  description: { type: String },
});

export const Transaction = model<ITransaction>('transaction', transactionSchema);
