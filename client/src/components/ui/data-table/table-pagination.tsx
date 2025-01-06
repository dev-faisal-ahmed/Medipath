/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from '@tanstack/react-router';
import { Button } from '../button';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

interface ITabelPaginationProps {
  page: number;
  totalPages: number;
}

export function TablePagination({ page, totalPages }: ITabelPaginationProps) {
  const navigate = useNavigate();

  function goNext() {
    navigate({ search: { page: String(page + 1) } as any });
  }

  function goPrevious() {
    navigate({ search: { page: String(page - 1) } as any });
  }

  function goTo(pageNumber: number) {
    navigate({ search: { page: String(pageNumber) } as any });
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
              <Button onCanPlay={() => goTo(pageNumber)} variant="outline" size="icon">
                {pageNumber}
              </Button>
            );
          else if (pageNumber === 1 || pageNumber === totalPages || page + 1 === pageNumber || page - 1 === pageNumber)
            return (
              <Button onClick={() => goTo(pageNumber)} variant="ghost" size="icon" key={index}>
                {pageNumber}
              </Button>
            );
          else return <span> ... </span>;
        })}
      </div>
      <Button onClick={goNext} disabled={page === totalPages} variant="outline">
        Next <ArrowRightIcon />
      </Button>
    </div>
  );
}
