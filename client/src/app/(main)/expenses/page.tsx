import { Header } from '@/components/shared';
import { AddExpense } from './_ui/add-expense';

export default function ExpensesPage() {
  return (
    <>
      <Header showSearchBar>
        <AddExpense />
      </Header>
    </>
  );
}
