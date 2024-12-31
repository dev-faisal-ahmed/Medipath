import { Header } from '@/providers/header/header.provider';
import { AddReferrer } from '../add-referrer';
import { REFERRER_TYPE } from '@/lib/types/referrer';

export function ReferrerAgentPage() {
  return (
    <>
      <Header title="Agents">
        <AddReferrer referrerType={REFERRER_TYPE.AGENT} />
      </Header>
    </>
  );
}
