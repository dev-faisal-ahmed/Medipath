import { Header } from '@/components/shared';
import { AddExpense } from './_ui/add-expense';
import { Expenses } from './_ui/expenses';

export default function ExpensesPage() {
  return (
    <>
      <Header title="Expenses">
        <AddExpense />
      </Header>
      <Expenses />
    </>
  );
}
