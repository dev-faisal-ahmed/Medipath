import { Header } from '@/components/shared';
import { RefererExpense } from '@/components/shared/referrer-expenses';
import { REFERRER_TYPE } from '@/types';

export default function ReferredExpensesPage() {
  return (
    <>
      <Header title="Referred Expenses" />
      <RefererExpense referrerType={REFERRER_TYPE.AGENT} />
    </>
  );
}
