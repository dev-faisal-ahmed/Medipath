import { model, Schema } from 'mongoose';
import { ITransaction, TRANSACTION_TYPE } from './transaction.interface';
import { MODEL } from '../model-names';

const transactionSchema = new Schema<ITransaction>(
  {
    billId: { type: Schema.Types.ObjectId, ref: MODEL.BILL },
    referrerId: { type: Schema.Types.ObjectId, ref: MODEL.REFERRER },
    type: { type: String, enum: Object.values(TRANSACTION_TYPE), required: true },
    amount: { type: Number, required: true, min: 0 },
    date: { type: Date, default: new Date() },
    description: { type: String },
  },
  { timestamps: true },
);

export const Transaction = model<ITransaction>(MODEL.TRANSACTION, transactionSchema);
