import { z } from 'zod';
import { singInAction } from '@/actions/auth.action';
import { tryCatch } from '@/helper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type TLoginForm = z.infer<typeof loginFormSchema>;

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleLogin = form.handleSubmit((data) => {
    const { email, password } = data;
    const id = toast.loading('Logging in....');

    tryCatch({
      id,
      tryFn: async () => {
        setIsLoading(true);
        const response = await singInAction({ email, password });
        if (response?.error) return toast.error(response.error, { id });
        toast.success('Successfully logged in!', { id });
        router.push('/');
      },
      finallyFn: () => setIsLoading(false),
    });
  });

  return { form, handleLogin, isLoading };
};
