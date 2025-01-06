/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '../button';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

interface IDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: { page: number; totalPages: number };
}

export function DataTable<TData, TValue>({ columns, data, pagination }: IDataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border">
      <Table>
        <TableHeader className="sticky top-0 bg-neutral-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="py-4 font-semibold" key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="border-b even:bg-gray-50"
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {pagination && pagination.totalPages > 1 && (
        <TablePagination page={pagination.page} totalPages={pagination.totalPages} />
      )}
    </div>
  );
}

interface ITabelPaginationProps {
  page: number;
  totalPages: number;
}

function TablePagination({ page, totalPages }: ITabelPaginationProps) {
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
