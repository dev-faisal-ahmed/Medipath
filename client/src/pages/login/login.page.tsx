import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { z } from 'zod';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';
import { Input, PasswordInput } from '@/components/ui/input';
import { CommonFormFiled } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { loginWithCredentials } from '@/api/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { saveAccessTokenToLocal, tryCatch } from '@/helper';
import { useMutation } from '@tanstack/react-query';

export function LoginPage() {
  const { form, handleLogin, isPending } = useLogin();

  return (
    <main className="flex h-dvh items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Welcome to <span className="text-destructive">Medi</span> <span className="text-primary">Path</span> 👋
          </CardTitle>
          <CardDescription className="text-center font-semibold">Please provide your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-3" onSubmit={handleLogin}>
              <CommonFormFiled control={form.control} name="email" label="Email">
                {({ field }) => <Input {...field} placeholder="@: John@doe" />}
              </CommonFormFiled>
              <CommonFormFiled control={form.control} name="password" label="Password">
                {({ field }) => <PasswordInput {...field} placeholder="@: ------" />}
              </CommonFormFiled>
              <Button disabled={isPending} className="mt-2 w-full">
                {isPending ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type TLoginForm = z.infer<typeof loginFormSchema>;

function useLogin() {
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
