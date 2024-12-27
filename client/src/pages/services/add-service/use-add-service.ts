import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { addService } from '@/api/query/service';
import { tryCatch, wordCapitalize } from '@/helper';
import { useForm } from 'react-hook-form';

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
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<TAddServiceForm>({
    resolver: zodResolver(addServiceSchema),
    defaultValues: { name: '', price: '', roomNo: '' },
  });

  const { isPending, mutateAsync } = useMutation({ mutationFn: addService });

  const handleAddService = form.handleSubmit((data) => {
    const id = toast.loading('Adding Service');
    tryCatch({
      id,
      tryFn: async () => {
        const response = await mutateAsync({ ...data, price: Number(data.price) });
        toast.success(response.message, { id });
        setIsOpen(false);
      },
    });
  });

  return { form, handleAddService, isPending, state: { isOpen, setIsOpen } };
}
