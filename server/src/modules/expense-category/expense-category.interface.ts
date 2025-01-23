import { Schema } from 'mongoose';

export interface IExpenseCategory {
  _id: Schema.Types.ObjectId;
  name: string;
  isDeleted: boolean;
}
