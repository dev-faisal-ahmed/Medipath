/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '../scroll-area';
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
    <main className="flex h-full flex-col overflow-x-auto">
      <section className="flex size-full grow flex-col gap-2 overflow-hidden rounded-md bg-white">
        <ScrollArea className="h-20 grow" hideScrollbar>
          <Table>
            <TableHeader className="bg-neutral-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead className="font-semibold uppercase" key={header.id}>
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
                  <TableRow className="even:bg-gray-50" key={row.id} data-state={row.getIsSelected() && 'selected'}>
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
        </ScrollArea>
        {pagination && pagination.totalPages > 1 && (
          <TablePagination page={pagination.page} totalPages={pagination.totalPages} />
        )}
      </section>
    </main>
  );
}

interface ITabelPaginationProps {
  page: number;
  totalPages: number;
}

function TablePagination({ page, totalPages }: ITabelPaginationProps) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between p-4">
      <Button
        onClick={() => navigate({ search: { page: String(page - 1) } as any })}
        disabled={page === 1}
        variant="secondary"
      >
        <ArrowLeftIcon /> Previous
      </Button>
      <Button
        onClick={() => navigate({ search: { page: String(page + 1) } as any })}
        disabled={page === totalPages}
        variant="secondary"
      >
        Next <ArrowRightIcon />
      </Button>
    </div>
  );
}
