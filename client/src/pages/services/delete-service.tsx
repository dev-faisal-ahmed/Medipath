import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { QUERY_KEYS } from '@/api';
import { deleteService } from '@/api/query';
import { tryCatch } from '@/helper';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface IProps {
  serviceId: string;
  closeDrawer: () => void;
}

export function DeleteService({ serviceId, closeDrawer }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const QC = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteService,
    onSuccess: () => QC.invalidateQueries({ queryKey: [QUERY_KEYS.SERVICES] }),
  });

  function handleDeleteService() {
    const id = toast.loading('Deleting service...');
    tryCatch({
      id,
      tryFn: async () => {
        const response = await mutateAsync(serviceId);
        toast.success(response.message, { id });
        setIsOpen(false);
        closeDrawer();
      },
    });
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="justify-start text-foreground" variant="destructive_ghost">
          <TrashIcon /> Delete Service
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Once you delete this your service can be found in the Trash Page
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleDeleteService} disabled={isPending}>
            {isPending ? 'Pending' : 'Proceed'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
