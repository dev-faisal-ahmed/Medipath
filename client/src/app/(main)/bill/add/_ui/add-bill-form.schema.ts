import { zodNumber } from '@/helper';
import { z } from 'zod';

const serviceSubSchema = z.object({
  id: z.string(),
  name: z.string().toUpperCase().trim(),
  price: z.number(),
  roomNo: z.string(),
});

const patientSubSchema = z.object({
  name: z.string().min(1, { message: 'Patient name is required' }).toUpperCase().trim(),
  age: zodNumber({ min: 0, message: 'Age can not be negative' }).optional(),
  ageTitle: z.string().optional(),
  phone: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().toUpperCase().trim().optional(),
});

export const addBillFormSchema = z
  .object({
    services: serviceSubSchema.array().min(1, { message: 'Service is required' }),
    patientInfo: patientSubSchema,
    visitorId: z.string().optional(),
    referrerId: z.string().optional(),
    referrerCommission: zodNumber({ min: 0, message: 'Referrer commission can not be negative' }).optional(),
    visitCommission: zodNumber({ min: 0, message: 'Visitor commission can not be negative' }).optional(),
    discount: zodNumber({ min: 0, message: 'Discount can not be negative' }).optional(),
    paid: zodNumber({ min: 0, message: 'Paid can not be negative' }).optional(),
  })
  .superRefine((value, ctx) => {
    const paid = Number(value.paid) || 0;
    const discount = Number(value.discount) || 0;
    const referrerCommission = Number(value.referrerCommission) || 0;
    const visitCommission = Number(value.visitCommission) || 0;
    const services = value.services;

    const totalPrice = services.reduce((total, service) => {
      total += service.price;
      return total;
    }, 0);

    const totalCommission = referrerCommission + visitCommission;

    if (discount > totalPrice) ctx.addIssue({ code: 'custom', message: 'Too much discount', path: ['discount'] });
    else if (paid > totalPrice - discount) ctx.addIssue({ code: 'custom', message: 'Too much paid', path: ['paid'] });
    else if (totalCommission > totalPrice - discount) {
      ctx.addIssue({
        code: 'custom',
        message: 'Too much commission',
        path: ['visitCommission'],
      });

      ctx.addIssue({
        code: 'custom',
        message: 'Too much commission',
        path: ['referrerCommission'],
      });
    }
  });

export type TAddBillForm = z.infer<typeof addBillFormSchema>;
