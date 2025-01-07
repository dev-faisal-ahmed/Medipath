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
  _id: string;
  referrerId: string;
  visitorId: string;
  billId: string;
  patientInfo: IPatient;
  serviceIds: string;
  date: Date;
  price: number;
  discount: number;
  paid: number;
  referrerCommission: number;
  visitCommission: number;
}
