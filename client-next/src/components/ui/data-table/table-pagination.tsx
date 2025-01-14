'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../button';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

interface ITabelPaginationProps {
  page: number;
  totalPages: number;
}

export function TablePagination({ page, totalPages }: ITabelPaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function navigate(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.replace(`${pathname}?${params.toString()}`);
  }

  function goNext() {
    navigate(page + 1);
  }

  function goPrevious() {
    navigate(page - 1);
  }

  function goTo(pageNumber: number) {
    navigate(pageNumber);
  }

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
          else return <span key={index}> ... </span>;
        })}
      </div>
      <Button onClick={goNext} disabled={page === totalPages} variant="outline">
        Next <ArrowRightIcon />
      </Button>
    </div>
  );
}
