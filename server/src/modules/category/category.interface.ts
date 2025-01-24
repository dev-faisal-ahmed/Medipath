import { Schema } from 'mongoose';
import { MODE } from '../../utils/type';

export interface ICategory {
  id: Schema.Types.ObjectId;
  name: string;
  mode: MODE;
  isDeleted: boolean;
}
