import { cn } from '@/lib/utils';

export const Message = ({ className, message }: TMessageProps) => {
  return <p className={cn('mt-2 w-full text-center font-bold', className)}>{message}</p>;
};
// type

type TMessageProps = { className?: string; message: string };
