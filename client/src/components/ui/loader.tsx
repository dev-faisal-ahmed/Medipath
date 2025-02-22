import { cn } from '@/lib/utils';
import { CircleDashed, LucideProps } from 'lucide-react';
import { forwardRef } from 'react';
import { Skeleton } from './skeleton';

export const Loader = forwardRef<SVGSVGElement, LucideProps>(({ className, ...props }, ref) => (
  <CircleDashed ref={ref} className={cn('size-5 animate-spin', className)} {...props} />
));

Loader.displayName = 'Loader';

export const Loading = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div ref={ref} className="flex w-full items-center justify-center py-3.5 text-secondary-foreground" {...props}>
    <Loader />
  </div>
));

Loading.displayName = 'Loading';

export const FullSpaceLoader = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Loading />
    </div>
  );
};

// Table Loader
export const TableLoader = ({ length = 5, className }: { length?: number; className?: string }) => (
  <section className={cn(className)}>
    <div className="flex w-full flex-col gap-2 rounded-md border p-2">
      <Skeleton className="h-8 w-full" />
      {Array.from({ length }).map((_, index) => (
        <TableRowLoader key={index} />
      ))}
    </div>
  </section>
);

const TableRowLoader = () => (
  <div className="flex items-center gap-2">
    {Array.from({ length: 5 }).map((_, index) => (
      <Skeleton key={index} className="h-8 w-full" />
    ))}
  </div>
);

// Expense Category Loader
export const ExpenseCategoryLoader = () => (
  <section className="p-6">
    <div className="mb-4 flex items-center justify-between">
      <Skeleton className="h-6 w-44" />
      <Skeleton className="h-6 w-32" />
    </div>
    <div className="space-y-3">
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index}>
          <Skeleton className="mb-2 h-4 w-40" />
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 6 }).map((_, subIndex) => (
              <ExpenseCategoryCardLoader key={subIndex} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const ExpenseCategoryCardLoader = () => (
  <div className="flex items-center gap-4 rounded-md border p-2">
    <Skeleton className="size-8" />
    <div>
      <Skeleton className="h-4 w-40" />
      <Skeleton className="mt-1 h-4 w-2/3" />
    </div>
    <Skeleton className="ml-auto h-6 w-16" />
  </div>
);
