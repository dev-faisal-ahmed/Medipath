import { zodEnum } from '@/helper';
import { AGENT_TITLE, GENDER } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const patientInfoSubSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  phone: z.string(),
  address: z.string(),
  age: z.string().refine((val) => val && Number(val) > 0, { message: 'Age can not be negative' }),
  ageTitle: zodEnum({
    options: Object.values(AGENT_TITLE),
    message: `Invalid age title it has to be ${Object.values(AGENT_TITLE).join(' | ')}`,
  }),
  gender: zodEnum({
    options: Object.values(GENDER),
    message: 'Invalid gender it has to be Male | Female | Others',
  }),
});

const addBillFormSchema = z.object({
  referrerId: z.string(),
  visitorId: z.string(),
  patientInfo: patientInfoSubSchema,
  serviceIds: z.array(z.string()).min(1, { message: 'Please provide at least a service' }),
  discount: z.string().refine((val) => val && Number(val) > 0, { message: 'Discount can not be negative' }),
  paid: z.string().refine((val) => val && Number(val) > 0, { message: 'Paid amount can not be negative' }),
  referrerCommission: z
    .string()
    .refine((val) => val && Number(val) > 0, { message: 'Referrer commission amount can not be negative' }),
  visitCommission: z
    .string()
    .refine((val) => val && Number(val) > 0, { message: 'Visited commission amount can not be negative' }),
});

type TAddBillForm = z.infer<typeof addBillFormSchema>;

export function useAddBillForm() {
  const form = useForm<TAddBillForm>({
    resolver: zodResolver(addBillFormSchema),
    defaultValues: {
      patientInfo: { name: '', address: '', age: '', ageTitle: '', gender: '', phone: '' },
      discount: '',
      paid: '',
      referrerCommission: '',
      referrerId: '',
      serviceIds: [''],
      visitCommission: '',
      visitorId: '',
    },
  });

  const handleAddBill = form.handleSubmit((formData) => {
    console.log(formData);
  });

  return { form, handleAddBill };
}
