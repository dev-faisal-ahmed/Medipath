import { getAuth } from '@/actions';

export default async function Home() {
  const session = await getAuth();

  return <h1>Welcome to Medipath{JSON.stringify(session)}</h1>;
}
