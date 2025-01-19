'use client';

import { useFormContext } from 'react-hook-form';
import { TAddBillForm } from './add-bill.schema';
import { CommonFormFiled } from '@/components/shared/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { CONST } from '@/lib/const';
import { useMemo } from 'react';

export const BillPrice = () => {
  const { control, watch } = useFormContext<TAddBillForm>();
  const services = watch('services');
  const discount = watch('discount');
  const paid = watch('paid');
  const visitor = watch('visitorId');
  const referrer = watch('referrerId');

  const totalPrice = useMemo(() => {
    return services.reduce((total: number, service) => {
      total += service.price;
      return total;
    }, 0);
  }, [services]);

  const due = totalPrice - Number(discount) - Number(paid);

  return (
    <>
      <CommonFormFiled control={control} name="visitCommission" label="Visitor Commission">
        {({ field }) => <Input placeholder="Input amount" {...field} type="number" min={0} disabled={!visitor} />}
      </CommonFormFiled>
      <CommonFormFiled control={control} name="referrerCommission" label="Referrer Commission" disabled={!referrer}>
        {({ field }) => <Input placeholder="Input amount" {...field} type="number" min={0} />}
      </CommonFormFiled>
      <CommonFormFiled control={control} name="discount" label="Discount">
        {({ field }) => <Input placeholder="Input amount" {...field} type="number" min={0} />}
      </CommonFormFiled>
      <CommonFormFiled control={control} name="paid" label="Paid">
        {({ field }) => <Input placeholder="Input amount" {...field} type="number" min={0} />}
      </CommonFormFiled>
      <div className="mt-4 rounded-md border p-4 sm:col-span-2">
        <RenderAmount label="Total" value={totalPrice} heading />
        <RenderAmount label="Discount" value={Number(discount)} />
        <RenderAmount label="Paid" value={Number(paid)} />
        <RenderAmount label="Due" value={Number(due)} />
      </div>
    </>
  );
};

const RenderAmount = ({ label, value, heading }: { label: string; value: number; heading?: boolean }) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className={cn('font-semibold', heading && 'text-lg')}>{label}</h2>
      <p className={cn('font-semibold', heading && 'text-lg')}>
        {value} {CONST.TAKA}
      </p>
    </div>
  );
};
