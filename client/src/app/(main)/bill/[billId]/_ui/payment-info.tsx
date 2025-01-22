import { CiNoWaitingSign } from 'react-icons/ci';
import { MdVerifiedUser } from 'react-icons/md';

type TProps = {
  price: number;
  discount?: number;
  paid: number;
};

export const PaymentInfo = ({ paid, price, discount }: TProps) => {
  const due = price - paid - (discount ? discount : 0);

  return (
    <>
      <h3 className="mb-3 mt-8 text-base font-bold">Payment Info</h3>
      <div className="relative mx-auto w-full max-w-[420px] border-t border-neutral-300 p-2">
        <div className="flex items-center justify-between gap-12">
          <p>Total Cost</p>
          <p className="font-semibold">{price}</p>
        </div>
        <div className="mt-1 flex items-center justify-between gap-12">
          <p>Discount</p>
          <p className="font-semibold">{discount}</p>
        </div>
        <div className="mt-1 flex items-center justify-between gap-12">
          <p>Paid</p>
          <p className="font-semibold">{paid}</p>
        </div>
        <div className="mt-1 flex items-center justify-between gap-12 border-t border-neutral-300">
          <p>Due</p>
          <p className="font-semibold">{due}</p>
        </div>
        {/* paid icon */}
        <div className="absolute left-1/2 top-[58%] -translate-x-1/2">
          {due ? (
            <div className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xl text-red-500">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white">
                <CiNoWaitingSign size={18} />
              </div>
              DUE
            </div>
          ) : (
            <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xl text-green-500">
              <div className="text-green-500">
                <MdVerifiedUser />
              </div>
              PAID
            </div>
          )}
        </div>
      </div>
    </>
  );
};
