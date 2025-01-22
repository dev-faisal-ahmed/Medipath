import { Header } from '@/components/shared';
import { AddReferrer } from './_ui/add-referrer';
import { ReferrerTable } from './_ui/referrer.table';

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
