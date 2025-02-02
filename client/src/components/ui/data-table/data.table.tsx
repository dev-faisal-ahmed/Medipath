'use client';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TablePagination } from './table-pagination';
import { ScrollArea, ScrollBar } from '../scroll-area';
import { cn } from '@/lib/utils';

export const DataTable = <TData, TValue>({ columns, data, pagination, className }: TDataTableProps<TData, TValue>) => {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    // <div className="flex h-full flex-col overflow-x-auto">
    // <div className="flex size-full grow flex-col gap-2">
    <ScrollArea disableScrollbar>
      <div className={cn('w-full overflow-hidden rounded-md border', className)}>
        <Table>
          <TableHeader className="sticky top-0 bg-neutral-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta;
                  return (
                    <TableHead
                      className="py-4 font-semibold"
                      key={header.id}
                      colSpan={header.colSpan}
                      data-stretch={meta?.noStretch && 'compact'}
                    >
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
                  className="border-b even:bg-gray-100"
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
      </div>

      {pagination && pagination.totalPages > 1 && (
        <TablePagination page={pagination.page} totalPages={pagination.totalPages} />
      )}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
    // </div>
    // </div>
  );
};

// type
type TDataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: { page: number; totalPages: number };
  className?: string;
};
