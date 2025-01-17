import { z } from 'zod';
import { singInAction } from '@/actions/auth.action';
import { errorMessageGen } from '@/helper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useIsMutating, useMutation } from '@tanstack/react-query';
import { QK } from '@/api-lib';

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type TLoginForm = z.infer<typeof loginFormSchema>;

const mutationKey = QK.AUTH + '_LOGIN';
export const useLogin = () => {
  const router = useRouter();

  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  });

  const isMutating = useIsMutating({ mutationKey: [mutationKey] });

  const { mutate } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: singInAction,
    onSuccess: () => {
      router.push('/');
    },
    onError: (error) => {
      toast.error(errorMessageGen(error));
    },
  });

  const handleLogin = form.handleSubmit((data) => {
    mutate(data);
  });

  return { form, handleLogin, isLoading: !!isMutating };
};
