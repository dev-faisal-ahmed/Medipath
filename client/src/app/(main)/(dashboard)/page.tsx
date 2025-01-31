import { Header } from '@/components/shared';
import { Dashboard } from './_ui/dashboard';

export default async function Home() {
  return (
    <>
      <Header title="Dashboard" />
      <Dashboard />
    </>
  );
}
