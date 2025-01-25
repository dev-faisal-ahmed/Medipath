'use client';

import { Message } from '@/components/shared';
import { FullSpaceLoader } from '@/components/ui/loader';
import { UpdateCategory } from './update-category';
import { DeleteCategory } from './delete-category';
import { useGetCategories } from '@/hooks';

export const Categories = () => {
  const { data: categoriesData, isLoading } = useGetCategories();
  const categories = categoriesData?.data || [];

  if (isLoading) return <FullSpaceLoader />;
  if (!categories.length) return <Message className="mt-6" message="No category found" />;

  return (
    <section className="grid gap-4 p-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {categories.map(({ id, name }) => (
        <div className="flex w-full items-center gap-3 rounded-md border bg-white p-2" key={id}>
          <h4 className="ml-1 mr-auto font-bold">{name}</h4>
          <DeleteCategory categoryId={id} />
          <UpdateCategory id={id} name={name} />
        </div>
      ))}
    </section>
  );
};
