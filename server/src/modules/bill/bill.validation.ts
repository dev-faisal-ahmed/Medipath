import { z } from 'zod';
import { zodMongoObjectId } from '../../helpers';
import { AGE_TITLE, GENDER } from './bill.interface';

const patientInfoSubSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  phone: z.string().optional(),
  address: z.string().optional(),
  age: z.number().positive(),
  ageTitle: z.nativeEnum(AGE_TITLE, { message: 'Invalid age title' }),
  gender: z.nativeEnum(GENDER, { message: 'Invalid gender.' }),
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

const takeDueSchema = z.object({
  amount: z.number().positive({ message: 'Amount can not be negative' }),
});

const giveCommissionSchema = z.object({
  amount: z.number().positive({ message: 'Amount can not be negative' }),
  referrerId: zodMongoObjectId('Invalid referredId'),
});

const updateBillSchema = z.object({
  referrerId: zodMongoObjectId('Invalid referrerId').optional(),
  visitorId: zodMongoObjectId('Invalid visitorId').optional(),
  referrerCommission: z.number().positive().optional(),
  visitCommission: z.number().positive().optional(),
  discount: z.number().positive().optional(),
});

export const billValidation = { addBillSchema, takeDueSchema, giveCommissionSchema, updateBillSchema };

export type TAddBillPayload = z.infer<typeof addBillSchema>;
export type TTakeDuePayload = z.infer<typeof takeDueSchema>;
export type TGiveCommissionPayload = z.infer<typeof giveCommissionSchema>;
export type TUpdateBillPayload = z.infer<typeof updateBillSchema>;
