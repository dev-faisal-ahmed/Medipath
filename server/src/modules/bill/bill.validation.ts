import { z } from 'zod';
import { zodMongoObjectId } from '../../helpers';
import { AGENT_TITLE, GENDER } from './bill.interface';

const patientInfoSubSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  phone: z.string().optional(),
  address: z.string().optional(),
  age: z.number().positive().optional(),
  ageTitle: z.nativeEnum(AGENT_TITLE, { message: 'Invalid age title' }).optional(),
  gender: z.nativeEnum(GENDER, { message: 'Invalid gender.' }).optional(),
});

const serviceSubSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  roomNo: z.string().min(1, { message: 'roomNo is required' }),
  price: z.number().positive({ message: 'Price can be negative' }),
});

const addBillSchema = z.object({
  referrerId: zodMongoObjectId('Invalid referrerId').optional(),
  visitorId: zodMongoObjectId('Invalid visitorId').optional(),
  patientInfo: patientInfoSubSchema,
  services: serviceSubSchema.array().min(1, { message: 'Services is required' }),
  discount: z.number().positive().optional(),
  paid: z.number().positive().optional(),
  referrerCommission: z.number().positive().optional(),
  visitCommission: z.number().positive().optional(),
});

export const billValidation = { addBillSchema };

export type TAddBillPayload = z.infer<typeof addBillSchema>;
