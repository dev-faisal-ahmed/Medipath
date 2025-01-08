'use client';

import { CommonFormFiled } from '@/components/shared/form/common-form-field';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Input, PasswordInput } from '@/components/ui/input';
import { useLogin } from './use.login';

export function LoginForm() {
  const { form, handleLogin, isLoading } = useLogin();

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
            <Button disabled={isLoading} className="mt-2 w-full">
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
