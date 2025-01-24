import { TService } from './service.type';

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

export type TPatient = {
  name: string;
  phone?: string;
  address?: string;
  age?: number;
  ageTitle?: AGE_TITLE;
  gender?: GENDER;
};

export type TBill = {
  id: string;
  referrerId?: string;
  visitorId?: string;
  billId: string;
  patientInfo: TPatient;
  services: Pick<TService, 'name' | 'price' | 'roomNo'>[];
  date: Date;
  price: number;
  discount?: number;
  paid?: number;
  referrerCommission?: number;
  visitCommission?: number;
};
