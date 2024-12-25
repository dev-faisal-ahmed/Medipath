import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function LoginPage() {
  return (
    <main className="flex h-dvh items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Welcome to <span className="text-destructive">Medi</span> <span className="text-primary">Path</span> 👋
          </CardTitle>
          <CardDescription className="text-center font-semibold">Please provide your credentials</CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
}
