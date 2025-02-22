'use client';

import { Message } from '@/components/shared';
import { UpdateCategory } from './update-category';
import { DeleteCategory } from './delete-category';
import { useGetCategories } from '@/hooks';
import { Skeleton } from '@/components/ui/skeleton';

export const Categories = () => {
  const { data: categoriesData, isLoading } = useGetCategories();
  const categories = categoriesData?.data || [];

  if (isLoading) return <CategoriesLoader />;
  if (!categories.length) return <Message className="mt-6" message="No category found" />;

  return (
    <section className="my-6 grid gap-4 px-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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

const CategoriesLoader = () => (
  <div className="grid gap-4 p-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: 9 }).map((_, index) => (
      <div key={index} className="flex items-center gap-3 rounded-md border p-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="ml-auto size-8" />
        <Skeleton className="size-8" />
      </div>
    ))}
  </div>
);
