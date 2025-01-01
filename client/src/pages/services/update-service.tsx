import { QUERY_KEYS } from '@/api';
import { updateService } from '@/api/query';
import { CommonFormFiled } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { CommonDialog, DialogClose } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { tryCatch, wordCapitalize } from '@/helper';
import { IService } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PenLineIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface IUpdateService {
  payload: IService;
  closeDrawer(): void;
}

export function UpdateService({ payload, closeDrawer }: IUpdateService) {
  const {
    form,
    states: { isDialogOpen, setIsDialogOpen },
    handleUpdateService,
    isPending,
  } = useUpdateService({ payload, closeDrawer });

  return (
    <CommonDialog
      asChild
      trigger={
        <Button className="justify-start" variant="primary_ghost">
          <PenLineIcon /> Update
        </Button>
      }
      title="Update Service"
      description="Please provide the necessary information to update the service"
      control={{ isOpen: isDialogOpen, setIsOpen: setIsDialogOpen }}
    >
      <Form {...form}>
        <form onSubmit={handleUpdateService}>
          <CommonFormFiled name="name" label="Name">
            {({ field }) => <Input {...field} placeholder="@: X-Ray" />}
          </CommonFormFiled>
          <CommonFormFiled name="price" label="Price">
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

const updateServiceFormSchema = z.object({
  name: z
    .string()
    .transform((val) => wordCapitalize(val))
    .optional(),
  price: z
    .string()
    .refine((val) => Number(val) > 50, { message: 'Minimum price is 50 tk' })
    .optional(),
  roomNo: z.string().optional(),
});

type TUpdateServiceForm = z.infer<typeof updateServiceFormSchema>;

function useUpdateService({ payload, closeDrawer }: IUpdateService) {
  const form = useForm<TUpdateServiceForm>({
    resolver: zodResolver(updateServiceFormSchema),
    defaultValues: { name: payload.name, price: payload.price.toString(), roomNo: payload.roomNo },
  });

  const QC = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateService,
    onSuccess: () => QC.invalidateQueries({ queryKey: [QUERY_KEYS.SERVICES] }),
  });

  const handleUpdateService = form.handleSubmit((data) => {
    const id = toast.loading('Updating service...');
    const { name, price, roomNo } = data;

    tryCatch({
      id,
      tryFn: async () => {
        const response = await mutateAsync({ _id: payload._id, name, price: Number(price), roomNo });
        toast.success(response.message, { id });
        setIsDialogOpen(false);
        closeDrawer();
      },
    });
  });

  return { form, states: { isDialogOpen, setIsDialogOpen }, handleUpdateService, isPending };
}
