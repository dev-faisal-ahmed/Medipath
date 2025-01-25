import { Header } from '@/components/shared';
import { AddCategory } from './_ui/add-category';
import { Categories } from './_ui/categories';

export default function ExpenseCategoriesPage() {
  return (
    <>
      <Header showSearchBar>
        <AddCategory />
      </Header>
      <Categories />
    </>
  );
}
