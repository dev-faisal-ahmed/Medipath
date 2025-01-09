import './globals.css';

import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import { PropsWithChildren } from 'react';
import { Poppins } from 'next/font/google';

export const metadata: Metadata = { title: 'Medipath' };

const font = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`antialiased ${font.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
