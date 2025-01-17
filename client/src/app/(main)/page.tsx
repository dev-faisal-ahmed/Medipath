import { getAuth } from '@/actions';
import { Header } from '@/components/shared';

export default async function Home() {
  const session = await getAuth();

  return (
    <>
      <Header title="Dashboard" />
      <h1>Welcome to Medipath{JSON.stringify(session?.user)}</h1>
    </>
  );
}
