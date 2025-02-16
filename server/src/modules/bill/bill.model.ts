import { AGE_TITLE, GENDER, IBill, IPatient, TBillService } from './bill.interface';
import { model, Schema } from 'mongoose';
import { MODEL } from '../model-names';
import { transformJson } from '../../helpers';

const patientSubSchema = new Schema<IPatient>(
  {
    name: { type: String, required: true },
    age: { type: Number },
    ageTitle: { type: String, enum: Object.values(AGE_TITLE), default: AGE_TITLE.YEAR },
    phone: { type: String },
    gender: { type: String, enum: Object.values(GENDER) },
    address: { type: String },
  },
  { _id: false },
);

const servicesSubSchema = new Schema<TBillService>(
  {
    name: { type: String, required: true },
    roomNo: { type: String },
    price: { type: Number, required: true },
  },
  { _id: false },
);

const billSchema = new Schema<IBill>(
  {
    referrerId: { type: Schema.Types.ObjectId, ref: MODEL.REFERRER },
    visitorId: { type: Schema.Types.ObjectId, ref: MODEL.REFERRER },
    billId: { type: String, required: true, unique: true },
    services: { type: [servicesSubSchema], required: true, minlength: 1 },
    patientInfo: { type: patientSubSchema, required: true },
    price: { type: Number, min: 0 },
    discount: { type: Number, default: 0 },
    paid: { type: Number, default: 0 },
    referrerCommission: { type: Number, default: 0 },
    visitCommission: { type: Number, default: 0 },
  },
  { timestamps: true, toJSON: { transform: transformJson } },
);

export const Bill = model<IBill>(MODEL.BILL, billSchema);
