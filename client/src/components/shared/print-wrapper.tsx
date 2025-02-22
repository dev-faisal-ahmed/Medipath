'use client';

import { PrinterIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { ReactNode, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { format } from 'date-fns';
import Image from 'next/image';

const getPageMargins = () => {
  return `@page { margin: 50px !important; }`;
};

export const PrintWrapper = ({ title, children, date }: { title: string; children: ReactNode; date: Date }) => {
  const month = format(date, 'MMMM - yyyy');
  const printRef = useRef<HTMLDivElement>(null);
  const onPrint = useReactToPrint({ contentRef: printRef, documentTitle: `${title} : ${month}` });

  return (
    <>
      <style>{getPageMargins()}</style>
      <Button onClick={() => onPrint()}>
        <PrinterIcon className="mr-2 h-4 w-4" /> Print
      </Button>
      <section className="hidden">
        <div ref={printRef}>
          <div className="relative flex flex-col items-center justify-center gap-2">
            <Logo />
            <h1 className="text-xl font-bold">Medi Path Clinic And Digital Diagnostic Centre</h1>
            <p>Hospital Road, Rajjodhor Primary School, Sapahar Naogaon</p>
          </div>

          <p className="my-6 rounded-e-md border border-neutral-300 p-1 text-center text-lg font-bold">{title}</p>
          {children}
        </div>
      </section>
    </>
  );
};

const Logo = () => {
  return (
    <div className="absolute left-0 top-0 flex items-center gap-2">
      <Image src={'/images/medipath.jpg'} width={100} height={100} alt="Logo" />
    </div>
  );
};
