import { model, Schema } from 'mongoose';
import { IReferrer, REFERRER_TYPE } from './referrer.interface';

const referrerSchema = new Schema<IReferrer>(
  {
    name: { type: String, required: true },
    designation: { type: String },
    type: { type: String, enum: Object.values(REFERRER_TYPE) },
    phone: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Referrer = model<IReferrer>('referrer', referrerSchema);
