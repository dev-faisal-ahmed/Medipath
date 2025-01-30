import { Header } from '@/components/shared';
import { RefererExpense } from '@/components/shared/referrer-expenses';
import { REFERRER_TYPE } from '@/types';

export default function DoctorPcExpensesPage() {
  return (
    <>
      <Header title="Doctors Pc Expenses" />
      <RefererExpense referrerType={REFERRER_TYPE.DOCTOR} />
    </>
  );
}
