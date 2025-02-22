'use client';

import Image from 'next/image';

import { QK } from '@/api-lib';
import { getBillDetails } from '@/api-lib/query/bill.query';
import { Message } from '@/components/shared/message';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { PatientInfo } from './patient-info';
import { ServicesInfo } from './service-info';
import { PaymentInfo } from './payment-info';

export const BillDetails = () => {
  const { billId } = useParams();

  const printRef = useRef<HTMLDivElement>(null);
  const onPrint = useReactToPrint({ contentRef: printRef, documentTitle: `Invoice` });

  const { data: billData, isLoading } = useQuery({
    queryKey: [QK.BILL, { billId }],
    queryFn: () => getBillDetails(billId as string),
  });

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />;
      </div>
    );
  if (!billData?.data) return <Message message="Bill does not exist" />;

  const { createdAt, patientInfo, doctor, services, paid, price, discount, billId: bill_id } = billData.data;

  return (
    <ScrollArea className="grow">
      <section className="mx-auto mt-6 max-w-[920px] rounded-md bg-white">
        <div className="p-12" ref={printRef}>
          <div className="relative flex flex-col items-center justify-center gap-2">
            <Logo />
            <h1 className="text-2xl font-bold">Medi Path Clinic And Digital Diagnostic Centre</h1>
            <p>Hospital Road, Rajjodhor Primary School, Sapahar Naogaon</p>
            <p>
              Mobile : <span className="font-semibold"> 01725708078, 01728717696</span>
            </p>
          </div>

          <p className="my-6 rounded-e-md border border-neutral-300 p-1 text-center text-lg font-bold">
            Invoice / Bill
          </p>
          <PatientInfo billId={bill_id} createdAt={createdAt} patientInfo={patientInfo} doctor={doctor} />
          <ServicesInfo services={services} />
          <PaymentInfo paid={paid || 0} price={price} discount={discount} />
        </div>

        <div className="p-6">
          <Button onClick={() => onPrint()} className="mt-6 w-full">
            Print Invoice
          </Button>
        </div>
      </section>
    </ScrollArea>
  );
};

const Logo = () => {
  return (
    <div className="absolute left-0 top-0 flex items-center gap-2">
      <Image src={'/images/medipath.jpg'} width={100} height={100} alt="Logo" />
    </div>
  );
};
