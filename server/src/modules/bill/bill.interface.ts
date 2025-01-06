import { Schema } from 'mongoose';

export enum AGENT_TITLE {
  YEAR = 'YEAR',
  MONTH = 'MONTH',
  DAY = 'DAY',
  HOUR = 'HOUR',
}

export enum GENDER {
  MALE = 'MALE',
}

export type TGender = 'Male' | 'Female' | 'Others';

export interface IPatient {
  name: string;
  phone?: string;
  address?: string;
  age: number;
  ageTitle: AGENT_TITLE;
  gender: TGender;
}

export interface IBill {
  _id: Schema.Types.ObjectId;
  billId: string;
  referrerId: Schema.Types.ObjectId;
  visitedBy: Schema.Types.ObjectId;
  patientInfo: IPatient;
  serviceIds: Schema.Types.ObjectId;
  date: Date;
  price: number;
  discount: number;
  paid: number;
  referrerCommission: number;
  visitCommission: number;
}
