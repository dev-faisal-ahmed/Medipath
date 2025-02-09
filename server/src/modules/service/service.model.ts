import { model, Schema } from 'mongoose';
import { IService } from './service.interface';
import { MODEL } from '../model-names';
import { transformJson } from '../../helpers';

const serviceSchema = new Schema<IService>(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true, min: 50 },
    roomNo: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { transform: transformJson } },
);

export const Service = model<IService>(MODEL.SERVICE, serviceSchema);
