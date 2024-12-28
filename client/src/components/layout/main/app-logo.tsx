import { cn } from '@/lib/utils';
import { FaHandHoldingMedical } from 'react-icons/fa6';
interface IProps {
  className?: string;
  hideTitle?: boolean;
}

export function AppLogo({ className, hideTitle }: IProps) {
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
}
