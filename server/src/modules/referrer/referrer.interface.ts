import { Schema } from 'mongoose';

export enum REFERRER_TYPE {
  AGENT = 'AGENT',
  DOCTOR = 'DOCTOR',
}

export interface IReferrer {
  id: Schema.Types.ObjectId;
  name: string;
  designation?: string;
  type: REFERRER_TYPE;
  phone?: string;
  isDeleted: boolean;
}
