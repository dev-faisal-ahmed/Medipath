import { Header } from '@/components/shared';
import { AddReferrer } from './_components/add-referrer';
import { ReferrerTable } from './_components/referrer.table';

export default function ReferrersPage() {
  return (
    <>
      <Header showSearchBar>
        <AddReferrer />
      </Header>
      <ReferrerTable />
    </>
  );
}
