import { Header } from '@/components/shared';
import { ServicesTable } from './_components/service.table';
import { AddService } from './_components/add-service';

export default function Page() {
  return (
    <>
      <Header showSearchBar>
        <AddService />
      </Header>
      <ServicesTable />
    </>
  );
}
