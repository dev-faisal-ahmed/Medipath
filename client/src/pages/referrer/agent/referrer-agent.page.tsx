import { Header } from '@/providers/header/header.provider';
import { AddReferrer } from '../add-referrer';
import { REFERRER_TYPE } from '@/lib/types/referrer.type';
import { ReferrerTable } from '../referrer-table';

export function ReferrerAgentPage() {
  return (
    <>
      <Header showSearchBar>
        <AddReferrer referrerType={REFERRER_TYPE.AGENT} />
      </Header>
      <ReferrerTable referrerType={REFERRER_TYPE.AGENT} />
    </>
  );
}
