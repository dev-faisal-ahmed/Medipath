'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { useIsMutating } from '@tanstack/react-query';
import { ReactNode } from 'react';

interface IProps {
  formId: string;
  title: string;
  description?: string;
  children: ReactNode;
  submitButtonTitle?: string;
  submitLoadingTitle?: string;
  open: boolean;
  onOpenChange(open: boolean): void;
}

export function FormDialog({
  formId,
  title,
  description,
  children,
  submitButtonTitle,
  submitLoadingTitle,
  open,
  onOpenChange,
}: IProps) {
  const isMutating = useIsMutating({ mutationKey: [formId] });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>
          <Button form={formId} type="submit" isLoading={!!isMutating}>
            {!!isMutating ? <>{submitLoadingTitle || 'Submitting...'}</> : <>{submitButtonTitle || 'Submit'}</>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
