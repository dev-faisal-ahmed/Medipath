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

interface IProps {
  formId: string;
  title: string;
  description?: string;
  children?: string;
  submitButtonTitle?: string;
  submitLoadingTitle?: string;
}

export function FormDialog({ formId, title, description, children, submitButtonTitle, submitLoadingTitle }: IProps) {
  const isMutating = useIsMutating({ mutationKey: [formId] });

  return (
    <Dialog>
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
