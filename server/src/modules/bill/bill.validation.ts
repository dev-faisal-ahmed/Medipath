import { z } from 'zod';
import { zodEnum, zodMongoObjectId } from '../../helpers';
import { AGENT_TITLE, GENDER } from './bill.interface';

const patientInfoSubSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  phone: z.string().optional(),
  address: z.string().optional(),
  age: z.number().positive(),
  ageTitle: zodEnum({
    options: Object.values(AGENT_TITLE),
    message: `Invalid age title it has to be ${Object.values(AGENT_TITLE).join(' | ')}`,
  }).optional(),
  gender: zodEnum({
    options: Object.values(GENDER),
    message: 'Invalid gender it has to be Male | Female | Others',
  }).optional(),
});

const addBillSchema = z.object({
  referrerId: zodMongoObjectId('Invalid referrerId').optional(),
  visitorId: zodMongoObjectId('Invalid visitorId').optional(),
  patientInfo: patientInfoSubSchema,
  serviceIds: z.array(zodMongoObjectId('Invalid serviceId')).min(1, { message: 'Please provide at least a service' }),
  discount: z.number().positive().optional(),
  paid: z.number().positive().optional(),
  referrerCommission: z.number().positive().optional(),
  visitCommission: z.number().positive().optional(),
});

export const billValidation = { addBillSchema };

export type TAddBillPayload = z.infer<typeof addBillSchema>;
