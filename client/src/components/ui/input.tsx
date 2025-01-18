'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { EyeIcon, EyeOffIcon, SearchIcon, XIcon } from 'lucide-react';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'h-input flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, ...props }, ref) => {
    const [isShown, setIsShown] = React.useState(false);

    return (
      <div className="flex items-center overflow-hidden rounded-md border border-input focus-within:ring-1 focus-within:ring-ring">
        <input
          type={isShown ? 'text' : 'password'}
          className={cn(
            'flex h-9 w-full bg-transparent px-3 py-1 text-base shadow-sm outline-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className,
          )}
          ref={ref}
          {...props}
        />
        <button
          onClick={() => setIsShown((prev) => !prev)}
          type="button"
          className="h-9 rounded-r-md px-3 hover:bg-primary/50"
        >
          {isShown ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
        </button>
      </div>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

interface ISearchInputProps {
  value: string;
  onChange(value: string): void;
  className?: { container?: string; input?: string };
}

const SearchInput = ({ value, onChange, className }: ISearchInputProps) => {
  return (
    <div className={cn('relative w-full', className?.container)}>
      <SearchIcon className="absolute left-2 top-1/2 size-5 -translate-y-1/2 text-primary" />
      <Input
        className={cn('w-full border-secondary pl-10', className?.input)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search here..."
      />
      {value && (
        <XIcon
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 size-5 -translate-y-1/2 cursor-pointer text-primary"
        />
      )}
    </div>
  );
};

export { Input, PasswordInput, SearchInput };
