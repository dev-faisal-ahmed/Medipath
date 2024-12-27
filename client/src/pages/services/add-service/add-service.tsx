import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAddService } from './use-add-service';
import { CommonFormFiled } from '@/components/shared';
import { CommonDialog, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';

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
            {({ field }) => <Input {...field} />}
          </CommonFormFiled>
          <CommonFormFiled name="price" label="Price∗">
            {({ field }) => <Input {...field} />}
          </CommonFormFiled>
          <CommonFormFiled name="roomNo" label="Room No">
            {({ field }) => <Input {...field} />}
          </CommonFormFiled>
          <div className="mt-4 flex items-center justify-end gap-4">
            <DialogClose>
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
