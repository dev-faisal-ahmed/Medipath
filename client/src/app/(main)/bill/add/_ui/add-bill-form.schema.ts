import { wordCapitalize, zodNumber } from '@/helper';
import { z } from 'zod';

const serviceSubSchema = z.object({
  _id: z.string(),
  name: z.string().refine((value) => wordCapitalize(value)),
  price: z.number(),
  roomNo: z.string(),
});

const patientSubSchema = z.object({
  name: z.string().min(1, { message: 'Patient name is required' }),
  age: zodNumber({ min: 0, message: 'Age can not be negative' }).optional(),
  ageTitle: z.string().optional(),
  phone: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
});

export const addBillFormSchema = z.object({
  services: serviceSubSchema.array().min(1, { message: 'Service is required' }),
  patientInfo: patientSubSchema,
  visitorId: z.string().optional(),
  referrerId: z.string().optional(),
  referrerCommission: zodNumber({ min: 0, message: 'Referrer commission can not be negative' }).optional(),
  visitCommission: zodNumber({ min: 0, message: 'Visitor commission can not be negative' }).optional(),
  discount: zodNumber({ min: 0, message: 'Discount can not be negative' }).optional(),
  paid: zodNumber({ min: 0, message: 'Paid can not be negative' }).optional(),
});

export type TAddBillForm = z.infer<typeof addBillFormSchema>;
