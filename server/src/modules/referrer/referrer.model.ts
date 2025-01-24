import { MODEL } from '../model-names';
import { model, Schema } from 'mongoose';
import { IReferrer, REFERRER_TYPE } from './referrer.interface';
import { transformJson } from '../../helpers';

const referrerSchema = new Schema<IReferrer>(
  {
    name: { type: String, required: true },
    designation: { type: String },
    type: { type: String, enum: Object.values(REFERRER_TYPE) },
    phone: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { transform: transformJson } },
);

export const Referrer = model<IReferrer>(MODEL.REFERRER, referrerSchema);
