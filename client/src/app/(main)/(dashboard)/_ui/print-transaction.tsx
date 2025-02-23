'use client';

import { QK } from '@/api-lib';
import { format } from 'date-fns';
import { formatDate } from '@/helper';
import { Message } from '@/components/shared';
import { getTransactionSummary, TTransactionSummary } from '@/api-lib/query';
import { CommonTable } from '@/components/shared/common-table';
import { PrintWrapper } from '@/components/shared/print-wrapper';
import { TableCell, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';

export const PrintTransaction = ({ date }: { date: Date }) => {
  const { data: summary, isLoading } = useQuery({
    queryKey: [QK.OVERVIEW, 'SUMMARY', { dateTime: formatDate(date) }],
    queryFn: () => getTransactionSummary({ dateTime: date }),
    select: (res) => res.data,
  });

  if (isLoading) return null;
  if (!summary) return null;

  return (
    <PrintWrapper
      title={`Transaction - ${formatDate(date, 'month')}`}
      date={date}
      printTitle="Print Monthly Transactions"
    >
      <TransactionTable {...summary} />
    </PrintWrapper>
  );
};

const TransactionTable = ({ transactions, total }: TTransactionSummary) => {
  if (!transactions.length) return <Message className="mt-12" message="No Transaction found!" />;

  return (
    <CommonTable columnNames={columnNames}>
      {transactions.map((transaction) => (
        <TableRow key={transaction.date}>
          <TableCell>{format(transaction.date, 'dd-MM-yyyy')}</TableCell>
          <TableCell>{transaction.income}</TableCell>
          <TableCell>{transaction.expense}</TableCell>
          <TableCell>{transaction.balance}</TableCell>
        </TableRow>
      ))}

      <TableRow>
        <TableCell className="border-t font-semibold">Total</TableCell>
        <TableCell className="border-t">{total.income}</TableCell>
        <TableCell className="border-t">{total.expense}</TableCell>
        <TableCell className="border-t">{total.balance}</TableCell>
      </TableRow>
    </CommonTable>
  );
};

const columnNames = ['Date', 'Income', 'Expense', 'Balance'];
