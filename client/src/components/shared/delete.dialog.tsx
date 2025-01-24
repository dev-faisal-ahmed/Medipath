'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

import { ActionButton, Button } from '../ui/button';
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';
import { useIsMutating } from '@tanstack/react-query';

export const DeleteDialog = ({ mutationKey, title, description, onDelete, open, onOpenChange }: TDeleteDialogProps) => {
  const isMutating = useIsMutating({ mutationKey: [mutationKey] });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <ActionButton label={title} actionType="DELETE" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are You Sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-w">
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <Button variant="destructive" isLoading={!!isMutating} onClick={onDelete}>
            {!!isMutating ? 'Deleting...' : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

type TDeleteDialogProps = {
  mutationKey: string;
  title: string;
  description: string;
  onDelete(): void;
  open: boolean;
  onOpenChange(open: boolean): void;
};
