'use client';

import { Button } from '../button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

export const TablePagination = ({ page, totalPages }: TTabelPaginationProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const navigate = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  const goNext = () => {
    navigate(page + 1);
  };

  const goPrevious = () => {
    navigate(page - 1);
  };

  const goTo = (pageNumber: number) => {
    navigate(pageNumber);
  };

  return (
    <div className="sticky bottom-0 flex h-16 items-center justify-between gap-4 border-t bg-neutral-100 px-4">
      <Button onClick={goPrevious} disabled={page === 1} variant="outline">
        <ArrowLeftIcon /> Previous
      </Button>
      <div className="flex items-center gap-2 font-semibold">
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;

          if (pageNumber === page)
            return (
              <Button key={index} onCanPlay={() => goTo(pageNumber)} variant="outline" size="icon">
                {pageNumber}
              </Button>
            );
          else if (pageNumber === 1 || pageNumber === totalPages || page + 1 === pageNumber || page - 1 === pageNumber)
            return (
              <Button key={index} onClick={() => goTo(pageNumber)} variant="ghost" size="icon">
                {pageNumber}
              </Button>
            );
          else if (pageNumber === 2 || pageNumber === totalPages - 1) return <span key={index}> ... </span>;
          else return null;
        })}
      </div>
      <Button onClick={goNext} disabled={page === totalPages} variant="outline">
        Next <ArrowRightIcon />
      </Button>
    </div>
  );
};

type TTabelPaginationProps = {
  page: number;
  totalPages: number;
};
