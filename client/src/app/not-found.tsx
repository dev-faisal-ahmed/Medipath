import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">404!</h1>
      <Link href="/">
        <Button>Go to home</Button>
      </Link>
    </div>
  );
}
