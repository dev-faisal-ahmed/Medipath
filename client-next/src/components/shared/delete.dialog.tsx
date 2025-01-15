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

import { Button } from '../ui/button';
import { TrashIcon } from 'lucide-react';
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';
import { useIsMutating } from '@tanstack/react-query';

interface IProps {
  mutationKey: string;
  title: string;
  description: string;
  onDelete(): void;
  open: boolean;
  onOpenChange(open: boolean): void;
}

export function DeleteDialog({ mutationKey, title, description, onDelete, open, onOpenChange }: IProps) {
  const isMutating = useIsMutating({ mutationKey: [mutationKey] });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive_ghost" className="justify-start text-foreground">
          <TrashIcon /> {title}
        </Button>
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
}
