import { z } from 'zod';
import { singInAction } from '@/lib/actions/auth.action';
import { tryCatch } from '@/lib/helper';
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

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleLogin = form.handleSubmit((data) => {
    const { email, password } = data;
    const id = toast.loading('Logging in....');

    console.log('pressed');

    tryCatch({
      id,
      tryFn: async () => {
        setIsLoading(true);
        const response = await singInAction({ email, password });
        if (response?.error) throw new Error(response.error);

        toast.success('Successfully logged in!', { id });
        router.push('/');
      },
      catchFn: () => toast.error('Invalid wrong user id or password', { id }),
      finallyFn: () => setIsLoading(false),
    });
  });

  return { form, handleLogin, isLoading };
}
