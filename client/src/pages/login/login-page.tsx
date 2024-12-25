import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField } from '@/components/ui/form';
import { CommonFormItem } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input, PasswordInput } from '@/components/ui/input';
import { useLogin } from './use-login';

export function LoginPage() {
  const { loginForm, handleLogin } = useLogin();
  const { control } = loginForm;

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
          <Form {...loginForm}>
            <form onSubmit={handleLogin}>
              <div className="space-y-3">
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <CommonFormItem label="Email">
                      <Input {...field} placeholder="@: john@doe" />
                    </CommonFormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <CommonFormItem label="Password" description="Please use a strong password">
                      <PasswordInput {...field} placeholder="@: ------" />
                    </CommonFormItem>
                  )}
                />
              </div>
              <Button className="mt-6 w-full">Login</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
