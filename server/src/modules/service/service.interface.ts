import { Schema } from 'mongoose';

export interface IService {
  id: Schema.Types.ObjectId;
  name: string;
  price: number;
  roomNo?: string;
  isDeleted: boolean;
}
