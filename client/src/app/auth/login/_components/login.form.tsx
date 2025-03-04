'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { errorMessageGen } from '@/helper';
import { CommonFormFiled } from '@/components/shared/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input, PasswordInput } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginWithCredentials,
    onSuccess: () => {
      toast.success('Logged in successfully');
      router.push('/');
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const handleLogin = form.handleSubmit((data) => mutate(data));

  const insertDemoCredentials = () => {
    form.setValue('email', 'faisal@gmail.com');
    form.setValue('password', 'faisal');
  };

  return (
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
            <Button onClick={insertDemoCredentials} type="button" variant="ghost" className="underline">
              Use demo credentials
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type TLoginForm = z.infer<typeof loginFormSchema>;

const loginWithCredentials = async (data: TLoginForm) => {
  const response = await signIn('credentials', { ...data, redirect: false });
  if (response?.error) throw new Error(response.error);
  return response;
};
