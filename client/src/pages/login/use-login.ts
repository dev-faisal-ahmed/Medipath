import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { tryCatch } from '@/helper/try-catch';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { loginWithCredentials } from '@/api/query/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { saveAccessTokenToLocal } from '@/helper';

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type TLoginForm = z.infer<typeof loginFormSchema>;

export function useLogin() {
  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  });

  const { mutateAsync, isPending } = useMutation({ mutationFn: loginWithCredentials });
  const navigate = useNavigate();
  const { search } = useLocation();

  const handleLogin = form.handleSubmit((data) => {
    const id = toast.loading('Logging in...');
    const { email, password } = data;
    tryCatch({
      id,
      tryFn: async () => {
        const response = await mutateAsync({ email, password });
        saveAccessTokenToLocal(response.data.accessToken);
        toast.success(response.message, { id });
        navigate({ to: search.redirect || '/' });
      },
    });
  });

  return { form, handleLogin, isPending };
}
