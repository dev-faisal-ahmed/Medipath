import { wordCapitalize } from '@/helper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const addServiceSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Service name is required' })
    .transform((val) => wordCapitalize(val)),
  price: z.string().refine((val) => Number(val) > 50, { message: 'Minimum price is 50 tk' }),
  roomNo: z.string().optional(),
});

type TAddServiceForm = z.infer<typeof addServiceSchema>;

export function useAddService() {
  const form = useForm<TAddServiceForm>({
    resolver: zodResolver(addServiceSchema),
    defaultValues: { name: '', price: '', roomNo: '' },
  });

  const handleAddService = form.handleSubmit((data) => {
    console.log(data);
  });

  return { form, handleAddService };
}
