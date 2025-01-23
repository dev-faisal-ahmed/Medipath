import { Header } from '@/components/shared';
import { BillTable } from './_ui/bill.table';

export default function BillsPage() {
  return (
    <>
      <Header showSearchBar />
      <BillTable />
    </>
  );
}
