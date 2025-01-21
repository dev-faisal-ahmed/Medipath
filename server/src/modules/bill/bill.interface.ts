import { Schema } from 'mongoose';
import { IService } from '../service/service.interface';

export enum AGE_TITLE {
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
  ageTitle: AGE_TITLE;
  gender: GENDER;
}

export type TBillService = Pick<IService, 'name' | 'roomNo' | 'price'>;

export interface IBill {
  _id: Schema.Types.ObjectId;
  referrerId: Schema.Types.ObjectId;
  visitorId: Schema.Types.ObjectId;
  billId: string;
  patientInfo: IPatient;
  services: TBillService[];
  date: Date;
  price: number;
  discount: number;
  paid: number;
  referrerCommission: number;
  visitCommission: number;
}
