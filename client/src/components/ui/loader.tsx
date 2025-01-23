import { cn } from '@/lib/utils';
import { CircleDashed, LucideProps } from 'lucide-react';
import { forwardRef } from 'react';

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
