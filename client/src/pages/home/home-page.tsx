import { useAuth } from '@/hook/useAuth';

export function HomePage() {
  const { getUser } = useAuth();
  const user = getUser();

  return JSON.stringify(user);
}
