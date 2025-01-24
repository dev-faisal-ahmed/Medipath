import { cn } from '@/lib/utils';
import { FaHandHoldingMedical } from 'react-icons/fa6';

export const AppLogo = ({ className, hideTitle }: TAppLogoProps) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-primary">
        <FaHandHoldingMedical size={36} />
      </span>
      {!hideTitle && (
        <h3 className="text-2xl font-bold">
          <span className="text-destructive">Medi</span>
          <span className="text-primary">Path</span>
        </h3>
      )}
    </div>
  );
};

// types
type TAppLogoProps = { className?: string; hideTitle?: boolean };
