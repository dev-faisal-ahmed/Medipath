import { Schema } from 'mongoose';

export interface IExpenseCategory {
  id: Schema.Types.ObjectId;
  name: string;
  isDeleted: boolean;
}
