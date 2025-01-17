'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loading } from './loader';
import { PenLineIcon, PlusIcon, TrashIcon } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground focus-visible:ring-1',
        link: 'text-primary underline-offset-4 hover:underline',
        'primary-ghost': 'hover:bg-primary hover:text-white',
        'destructive-ghost': 'hover:bg-destructive hover:text-white text-destructive',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, asChild = false, isLoading = false, disabled = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    const content = (
      <>
        {isLoading && <Loading />} {children}
      </>
    );

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={disabled || isLoading}
      >
        {asChild ? children : content}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

interface IActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  actionType: 'ADD' | 'UPDATE' | 'DELETE';
}

interface IActionButtonConfig {
  [key: string]: {
    icon: React.ReactNode;
    className?: string;
    variant?: 'primary-ghost' | 'destructive-ghost';
  };
}

const ACTION_BUTTON_CONFIG: IActionButtonConfig = {
  ADD: { icon: <PlusIcon /> },
  UPDATE: { icon: <PenLineIcon />, className: 'justify-start', variant: 'primary-ghost' },
  DELETE: { icon: <TrashIcon />, className: 'justify-start text-foreground', variant: 'destructive-ghost' },
};

const ActionButton = React.forwardRef<HTMLButtonElement, IActionButtonProps>(
  ({ label, actionType, className, ...props }) => {
    const config = ACTION_BUTTON_CONFIG[actionType];

    return (
      <Button {...props} className={cn(config.className, className)} variant={config.variant || 'default'}>
        {config.icon} {label}
      </Button>
    );
  },
);

ActionButton.displayName = 'ActionButton';

export { Button, buttonVariants, ActionButton };
