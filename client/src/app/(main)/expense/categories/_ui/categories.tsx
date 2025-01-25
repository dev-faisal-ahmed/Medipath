'use client';

import { QK } from '@/api-lib';
import { getCategories } from '@/api-lib/query';
import { Message } from '@/components/shared';
import { FullSpaceLoader } from '@/components/ui/loader';
import { useTopbarStore } from '@/stores/topbar';
import { useQuery } from '@tanstack/react-query';
import { UpdateCategory } from './update-category';

export const Categories = () => {
  const mode = useTopbarStore((state) => state.mode);

  const { data: categories, isLoading } = useQuery({
    queryKey: [QK.CATEGORY, { mode }],
    queryFn: () => getCategories(mode),
    select: (response) => response.data || [],
  });

  if (isLoading) return <FullSpaceLoader />;
  if (!categories?.length) return <Message className="mt-6" message="No category found" />;

  return (
    <section className="grid gap-4 p-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {categories.map(({ id, name }) => (
        <div className="flex w-full items-center gap-3 rounded-md border bg-white p-2" key={id}>
          <h4 className="ml-1 mr-auto font-bold">{name}</h4>
          <UpdateCategory id={id} name={name} />
        </div>
      ))}
    </section>
  );
};
