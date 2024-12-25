import { Schema } from 'mongoose';

export interface IService {
  _id: Schema.Types.ObjectId;
  name: string;
  price: number;
  roomNo: string;
}
