import { Schema } from 'mongoose';

export enum AGENT_TITLE {
  YEAR = 'YEAR',
  MONTH = 'MONTH',
  DAY = 'DAY',
  HOUR = 'HOUR',
}

export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHERS = 'OTHERS',
}

export interface IPatient {
  name: string;
  phone?: string;
  address?: string;
  age: number;
  ageTitle: AGENT_TITLE;
  gender: GENDER;
}

export interface IBill {
  _id: Schema.Types.ObjectId;
  referrerId: Schema.Types.ObjectId;
  visitorId: Schema.Types.ObjectId;
  billId: string;
  patientInfo: IPatient;
  serviceIds: Schema.Types.ObjectId;
  date: Date;
  price: number;
  discount: number;
  paid: number;
  referrerCommission: number;
  visitCommission: number;
}
