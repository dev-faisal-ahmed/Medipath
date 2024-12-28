import { z } from 'zod';
import { toast } from 'sonner';
import { addService } from '@/api/query';
import { CommonFormFiled } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { CommonDialog, DialogClose } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { tryCatch, wordCapitalize } from '@/helper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function AddService() {
  const {
    form,
    handleAddService,
    isPending,
    state: { isOpen, setIsOpen },
  } = useAddService();

  return (
    <CommonDialog
      control={{ isOpen, setIsOpen }}
      title="Add New Service"
      description="Please provide the service details to add a new service."
      trigger={
        <Button>
          <PlusIcon /> Add New Service
        </Button>
      }
      asChild
    >
      <Form {...form}>
        <form className="flex flex-col gap-3" onSubmit={handleAddService}>
          <CommonFormFiled name="name" label="Name∗">
            {({ field }) => <Input {...field} placeholder="@: X-Ray" />}
          </CommonFormFiled>
          <CommonFormFiled name="price" label="Price∗">
            {({ field }) => <Input {...field} placeholder="@: 450" />}
          </CommonFormFiled>
          <CommonFormFiled name="roomNo" label="Room No">
            {({ field }) => <Input {...field} placeholder="@ 203" />}
          </CommonFormFiled>
          <div className="mt-4 flex items-center justify-end gap-4">
            <DialogClose asChild>
              <Button className="w-20" variant="destructive">
                Close
              </Button>
            </DialogClose>
            <Button disabled={isPending} className="w-20">
              {isPending ? 'Adding' : 'Add'}
            </Button>
          </div>
        </form>
      </Form>
    </CommonDialog>
  );
}

const addServiceSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Service name is required' })
    .transform((val) => wordCapitalize(val)),
  price: z.string().refine((val) => Number(val) > 50, { message: 'Minimum price is 50 tk' }),
  roomNo: z.string().optional(),
});

type TAddServiceForm = z.infer<typeof addServiceSchema>;

function useAddService() {
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
