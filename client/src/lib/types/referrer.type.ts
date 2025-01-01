export enum REFERRER_TYPE {
  AGENT = 'AGENT',
  DOCTOR = 'DOCTOR',
}

export interface IReferrer {
  _id: string;
  name: string;
  designation?: string;
  type: REFERRER_TYPE;
  phone?: string;
  isDeleted: boolean;
}
