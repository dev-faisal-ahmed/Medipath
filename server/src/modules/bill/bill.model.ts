import { AGENT_TITLE, GENDER, IBill, IPatient } from './bill.interface';
import { model, Schema } from 'mongoose';
import { MODEL } from '../model-names';

const patientSubSchema = new Schema<IPatient>(
  {
    name: { type: String, required: true },
    age: { type: Number },
    ageTitle: { type: String, enum: Object.values(AGENT_TITLE), default: AGENT_TITLE.YEAR },
    phone: { type: String },
    gender: { type: String, enum: Object.values(GENDER) },
    address: { type: String },
  },
  { _id: false },
);

const billSchema = new Schema<IBill>(
  {
    referrerId: { type: Schema.Types.ObjectId, ref: MODEL.REFERRER },
    visitorId: { type: Schema.Types.ObjectId, ref: MODEL.REFERRER },
    billId: { type: String, required: true, unique: true },
    serviceIds: [{ type: Schema.Types.ObjectId }],
    patientInfo: { type: patientSubSchema, required: true },
    date: { type: Date, default: new Date() },
    price: { type: Number, min: 0 },
    discount: { type: Number, default: 0 },
    paid: { type: Number, default: 0 },
    referrerCommission: { type: Number, default: 0 },
    visitCommission: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Bill = model<IBill>(MODEL.BILL, billSchema);
