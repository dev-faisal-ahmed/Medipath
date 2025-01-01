import { QUERY_KEYS } from '@/api';
import { addReferrer } from '@/api/query';
import { CommonFormFiled } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { CommonDialog, DialogClose } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { tryCatch } from '@/helper';
import { REFERRER_TYPE } from '@/lib/types/referrer.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const CONFIG = {
  [REFERRER_TYPE.AGENT]: {
    triggerLabel: 'Add Agent',
    description: 'Please provide the necessary information to add agent',
    title: 'Add New Agent',
  },
  [REFERRER_TYPE.DOCTOR]: {
    triggerLabel: 'Add Doctor',
    description: 'Please provide the necessary information to add doctor',
    title: 'Add New Doctor',
  },
};

export function AddReferrer({ referrerType }: { referrerType: REFERRER_TYPE }) {
  const {
    form,
    state: { isDialogOpen, setIsDialogOpen },
    handleAddReferrer,
    isPending,
  } = useAddReferrer(referrerType);

  const config = CONFIG[referrerType];

  return (
    <CommonDialog
      trigger={
        <Button>
          <PlusIcon /> {config.triggerLabel}
        </Button>
      }
      control={{ isOpen: isDialogOpen, setIsOpen: setIsDialogOpen }}
      title={config.title}
      description={config.description}
      asChild
    >
      <Form {...form}>
        <form className="flex flex-col gap-3" onSubmit={handleAddReferrer}>
          <CommonFormFiled control={form.control} name="name" label="Name∗">
            {({ field }) => <Input placeholder="@: Name" {...field} />}
          </CommonFormFiled>
          <CommonFormFiled control={form.control} name="designation" label="Designation">
            {({ field }) => <Input placeholder="@: Designation" {...field} />}
          </CommonFormFiled>
          <CommonFormFiled control={form.control} name="phone" label="Phone Number">
            {({ field }) => <Input placeholder="@: Phone number" {...field} />}
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

const addReferrerFormSchema = z.object({
  name: z.string().min(1, { message: 'Referrer name is required' }),
  designation: z.string().min(1, { message: 'Designation can not be empty string' }).optional(),
  phone: z.string(),
});

type TAddReferrerForm = z.infer<typeof addReferrerFormSchema>;

function useAddReferrer(referrerType: REFERRER_TYPE) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const QC = useQueryClient();

  const form = useForm<TAddReferrerForm>({
    resolver: zodResolver(addReferrerFormSchema),
    defaultValues: { name: '', designation: '', phone: '' },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addReferrer,
    onSuccess: () => QC.invalidateQueries({ queryKey: [QUERY_KEYS.REFERRERS] }),
  });

  const handleAddReferrer = form.handleSubmit((data) => {
    const id = toast.loading('Adding Referrer...');

    tryCatch({
      id,
      tryFn: async () => {
        const response = await mutateAsync({ ...data, type: referrerType });
        toast.success(response.message, { id });
        setIsDialogOpen(false);
        form.reset();
      },
    });
  });

  return { form, state: { isDialogOpen, setIsDialogOpen }, handleAddReferrer, isPending };
}
