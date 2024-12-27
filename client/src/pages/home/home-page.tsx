import { useAuth } from '@/providers/auth/use-auth';

export function HomePage() {
  const { user } = useAuth();
  return JSON.stringify(user);
}
