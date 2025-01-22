import { Header } from '@/components/shared';
import { ServicesTable } from './_ui/service.table';
import { AddService } from './_ui/add-service';

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
