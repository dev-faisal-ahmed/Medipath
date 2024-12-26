import { toast } from 'sonner';

interface ITryCatchArgs {
  id: string | number;
  tryFn: () => void;
  catchFn?: (error: unknown) => void;
  finallyFn?: () => void;
}

export async function tryCatch({ id, tryFn, catchFn, finallyFn }: ITryCatchArgs) {
  return Promise.resolve(tryFn())
    .catch((error) => {
      if (catchFn) return catchFn(error);
      const message = error.response?.data?.message || error.message || 'Something went wrong';

      toast.error(message, { id });
    })
    .finally(() => {
      if (finallyFn) finallyFn();
    });
}
