import { TGetBillsResponse } from '@/api-lib/query';
import { Button } from '@/components/ui/button';
import { DataTableAction } from '@/components/ui/data-table';
import { usePopupState } from '@/hooks';
import Link from 'next/link';
import { TakeDue } from './take-due';
import { GiveCommission } from '@/components/shared';
import { UpdateBill } from './update-bill';
import { useMemo } from 'react';

export const BillTableAction = ({ bill }: TBillTableActionProps) => {
  const {
    id: billId,
    visitCommission,
    referrerCommission,
    visitorId,
    referrerId,
    transactions,
    price,
    paid,
    discount,
  } = bill;

  const due = price - (paid || 0) - (discount || 0);
  const { open, onOpenChange } = usePopupState();

  const defaultValues = useMemo(() => {
    return {
      visitCommission: String(visitCommission),
      referrerCommission: String(referrerCommission),
      visitorId,
      referrerId,
      discount: String(discount),
    };
  }, [visitCommission, referrerCommission, visitorId, referrerId, discount]);

  return (
    <DataTableAction open={open} onOpenChange={onOpenChange} className={{ childContainer: 'gap-3 p-3' }}>
      <Button variant="outline" asChild>
        <Link href={`/bill/${billId}`}>View Receipt</Link>
      </Button>

      <UpdateBill billId={billId} defaultValues={defaultValues} onActionChange={onOpenChange} />

      {due ? (
        <TakeDue billId={billId} />
      ) : (
        <Button disabled className="w-full">
          Already Paid
        </Button>
      )}

      {!!visitCommission && (
        <GiveCommission
          billId={billId}
          buttonLabel="Give Doctor Commission"
          referrerId={visitorId!}
          disabled={!hasDue({ amount: visitCommission, transactions: transactions, userId: visitorId! })}
        />
      )}

      {!!referrerCommission && (
        <GiveCommission
          billId={billId}
          buttonLabel="Give Agent Commission"
          referrerId={referrerId!}
          disabled={!hasDue({ amount: referrerCommission, transactions: transactions, userId: referrerId! })}
        />
      )}
    </DataTableAction>
  );
};

const hasDue = ({ amount, transactions, userId }: THasDueArgs) => {
  const transaction = transactions.find((transaction) => transaction?._id === userId);
  const totalPaid = transaction?.totalAmount || 0;

  if (amount <= totalPaid) return false;
  return true;
};

// types
type TBillTableActionProps = {
  bill: TGetBillsResponse;
};

type THasDueArgs = { transactions: TGetBillsResponse['transactions']; userId: string; amount: number };
