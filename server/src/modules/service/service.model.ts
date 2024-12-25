import { model, Schema } from 'mongoose';
import { IService } from './service.interface';

const serviceSchema = new Schema<IService>({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true, min: 50 },
  roomNo: { type: String },
});

export const Service = model<IService>('service', serviceSchema);
