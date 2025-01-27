import { PenLineIcon, PlusIcon, TrashIcon, WalletIcon } from 'lucide-react';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export const ActionButton = forwardRef<HTMLButtonElement, TActionButtonProps>(
  ({ label, actionType, className, ...props }, ref) => {
    const config = ACTION_BUTTON_CONFIG[actionType];

    return (
      <Button ref={ref} {...props} className={cn(config.className, className)} variant={config.variant || 'default'}>
        {config.icon} {label}
      </Button>
    );
  },
);

ActionButton.displayName = 'ActionButton';

// config
const ACTION_BUTTON_CONFIG: TActionButtonConfig = {
  ADD: { icon: <PlusIcon /> },
  UPDATE: { icon: <PenLineIcon />, className: 'justify-start', variant: 'primary-ghost' },
  DELETE: { icon: <TrashIcon />, className: 'justify-start text-foreground', variant: 'destructive-ghost' },
  PAYMENT: { icon: <WalletIcon />, className: 'justify-start text-foreground', variant: 'primary-ghost' },
};

// type
type TActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  actionType: 'ADD' | 'UPDATE' | 'DELETE' | 'PAYMENT';
};

type TActionButtonConfig = {
  [key: string]: {
    icon: React.ReactNode;
    className?: string;
    variant?: 'primary-ghost' | 'destructive-ghost';
  };
};
