import { Header } from '@/providers/header/header.provider';
import { AddReferrer } from '../add-referrer';
import { REFERRER_TYPE } from '@/lib/types/referrer';

export function ReferrerDoctorPage() {
  return (
    <>
      <Header title="Doctors">
        <AddReferrer referrerType={REFERRER_TYPE.DOCTOR} />
      </Header>
    </>
  );
}
