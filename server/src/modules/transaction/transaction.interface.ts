import { Schema } from 'mongoose';

export enum TRANSACTION_TYPE {
  REVENUE = 'REVENUE',
  EXPENSE = 'EXPENSE',
}

export enum TRANSACTION_CATEGORY {
  SERVICE_REVENUE = 'SERVICE_REVENUE',
  REFERER_EXPENSE = 'REFERER_EXPENSE',
  UTILITY_EXPENSE = 'UTILITY_EXPENSE',
}

export interface ITransaction {
  id: Schema.Types.ObjectId;
  amount: number;
  date: Date;
  description?: string;
  type: TRANSACTION_TYPE;
  // billId: Schema.Types.ObjectId;
  // referrerId: Schema.Types.ObjectId;
  // type: TRANSACTION_TYPE;
  // category: TRANSACTION_CATEGORY;
}
