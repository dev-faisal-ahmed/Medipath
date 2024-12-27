import { cn } from '@/lib/utils';

interface IProps {
  className?: string;
  hideTitle?: boolean;
}

export function AppLogo({ className, hideTitle }: IProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <img src={'/images/medipath.jpg'} width={60} height={60} alt="Logo" />
      {!hideTitle && (
        <h3 className="text-2xl font-bold">
          <span className="text-destructive">Medi</span>
          <span className="text-primary">Path</span>
        </h3>
      )}
    </div>
  );
}
