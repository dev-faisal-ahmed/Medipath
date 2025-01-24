import {
  ITransaction,
  IBillTransaction,
  IAdmissionTransaction,
  IDoctorOperationTransaction,
  IReferrerExpenseTransaction,
  IUtilityExpenseTransaction,
  TRANSACTION_TYPE,
} from './transaction.interface';

import { model, Schema } from 'mongoose';
import { MODEL, TRANSACTION_CATEGORY_TYPE } from '../model-names';
import { transformJson } from '../../helpers';

// base schema
const transactionSchema = new Schema<ITransaction>(
  {
    type: { type: String, enum: Object.values(TRANSACTION_TYPE), required: true },
    amount: { type: Number, required: true, min: 0 },
    date: { type: Date, default: new Date() },
    description: { type: String },
  },
  {
    timestamps: true,
    toJSON: { transform: transformJson },
    discriminatorKey: 'categoryType',
    collection: MODEL.TRANSACTION,
  },
);

// discriminator schemas
const billTransactionSchema = new Schema<IBillTransaction>({
  billId: { type: Schema.Types.ObjectId, ref: MODEL.BILL },
});

const admissionTransactionSchema = new Schema<IAdmissionTransaction>({
  admissionId: { type: Schema.Types.ObjectId, ref: MODEL.BILL },
});

const utilityExpenseTransactionSchema = new Schema<IUtilityExpenseTransaction>({
  categoryId: { type: Schema.Types.ObjectId, ref: MODEL.CATEGORY },
});

const referrerExpenseTransactionSchema = new Schema<IReferrerExpenseTransaction>({
  referrerId: { type: Schema.Types.ObjectId, ref: MODEL.REFERRER },
});

const doctorOperationTransactionSchema = new Schema<IDoctorOperationTransaction>({
  doctorId: { type: Schema.Types.ObjectId, ref: MODEL.DOCTOR },
});

// base models
export const Transaction = model<ITransaction>(MODEL.TRANSACTION, transactionSchema);

// discriminator models
export const BillTransaction = Transaction.discriminator<IBillTransaction>(
  TRANSACTION_CATEGORY_TYPE.BILL_TRANSACTION,
  billTransactionSchema,
);

export const AdmissionTransaction = Transaction.discriminator<IAdmissionTransaction>(
  TRANSACTION_CATEGORY_TYPE.ADMISSION_TRANSACTION,
  admissionTransactionSchema,
);

export const UtilityExpenseTransaction = Transaction.discriminator<IUtilityExpenseTransaction>(
  TRANSACTION_CATEGORY_TYPE.UTILITY_TRANSACTION,
  utilityExpenseTransactionSchema,
);

export const ReferrerExpenseTransaction = Transaction.discriminator<IReferrerExpenseTransaction>(
  TRANSACTION_CATEGORY_TYPE.REFERRER_TRANSACTION,
  referrerExpenseTransactionSchema,
);

export const DoctorOperationTransaction = Transaction.discriminator<IDoctorOperationTransaction>(
  TRANSACTION_CATEGORY_TYPE.DOCTOR_OPERATION_TRANSACTION,
  doctorOperationTransactionSchema,
);
