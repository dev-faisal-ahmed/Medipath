import { Button } from '@/components/ui/button';
import { CommonDialog } from '@/components/ui/dialog';
import { FilePenLineIcon, PenLineIcon } from 'lucide-react';

export function UpdateService() {
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
    >
      hi
    </CommonDialog>
  );
}
