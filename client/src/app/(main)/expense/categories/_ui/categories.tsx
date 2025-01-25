'use client';

import { QK } from '@/api-lib';
import { getCategories } from '@/api-lib/query';
import { Message } from '@/components/shared';
import { FullSpaceLoader } from '@/components/ui/loader';
import { useTopbarStore } from '@/stores/topbar';
import { useQuery } from '@tanstack/react-query';

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
        <div className="flex items-center gap-3 rounded-md border bg-white p-3" key={id}>
          <h4 className="font-semibold">{name}</h4>
        </div>
      ))}
    </section>
  );
};
