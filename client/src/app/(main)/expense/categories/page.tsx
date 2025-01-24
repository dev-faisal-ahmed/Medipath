import { Header } from '@/components/shared';
import { AddExpenseCategory } from './_ui/add-category';

export default function ExpenseCategoriesPage() {
  return (
    <>
      <Header showSearchBar>
        <AddExpenseCategory />
      </Header>
    </>
  );
}
