import { MODE } from './common.type';

export enum TRANSACTION_TYPE {
  REVENUE = 'REVENUE',
  EXPENSE = 'EXPENSE',
}

export type TTransaction = {
  id: string;
  amount: number;
  date: Date;
  description?: string;
  type: TRANSACTION_TYPE;
};

export type TBillTransaction = TTransaction & { billId: string };
export type TAdmissionTransaction = TTransaction & { admissionId: string };
export type TUtilityExpenseTransaction = TTransaction & { categoryId: string; mode: MODE };
export type TReferrerExpenseTransaction = TTransaction & { referrerId: string };
export type TDoctorOperationTransaction = TTransaction & { doctorId: string };
