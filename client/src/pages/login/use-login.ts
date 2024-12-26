import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { tryCatch } from '@/helper/try-catch';
import { loginWithCredentials } from '@/api/query/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/hook/useAuth';

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type TLoginForm = z.infer<typeof loginFormSchema>;

export function useLogin() {
  const loginForm = useForm<TLoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  });

  const loginMutation = useMutation({ mutationFn: loginWithCredentials });
  const navigate = useNavigate();
  const { saveToken } = useAuth();

  const handleLogin = loginForm.handleSubmit((data) => {
    const id = toast.loading('Logging in...');
    const { email, password } = data;
    tryCatch({
      id,
      tryFn: async () => {
        const response = await loginMutation.mutateAsync({ email, password });
        saveToken(response.data.accessToken);
        toast.success(response.message, { id });
        navigate({ to: '/' });
      },
    });
  });

  return { loginForm, handleLogin };
}
