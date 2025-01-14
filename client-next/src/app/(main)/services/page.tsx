import { Header } from '@/components/shared/header';
import { ServicesTable } from './_components/service.table';

export default function Page() {
  return (
    <main>
      <Header showSearchBar />
      <ServicesTable />
    </main>
  );
}
