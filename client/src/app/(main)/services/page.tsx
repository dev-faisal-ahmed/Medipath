import { Header } from '@/components/shared';
import { ServicesTable } from './_components/service.table';
import { AddService } from './_components/add-service';

export default function Page() {
  return (
    <main>
      <Header showSearchBar>
        <AddService />
      </Header>
      <ServicesTable />
    </main>
  );
}
