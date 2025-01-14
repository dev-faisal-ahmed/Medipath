import { Header } from '@/providers/header/header.provider';
import { AddService } from './add-service';
import { ServicesTable } from './service-table';

export function ServicesPage() {
  return (
    <>
      <Header showSearchBar>
        <AddService />
      </Header>

      <ServicesTable />
    </>
  );
}
