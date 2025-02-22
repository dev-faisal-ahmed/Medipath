import { ReactNode } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table';

export const CommonTable = ({ children, columnNames }: TCommonTableProps) => (
  <div className="w-full overflow-hidden rounded-md border">
    <Table>
      <TableHeader className="sticky top-0 bg-neutral-100">
        <TableRow>
          {columnNames.map((name) => (
            <TableHead key={name}>{name}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  </div>
);

type TCommonTableProps = { children: ReactNode; columnNames: string[] };
