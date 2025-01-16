import { getAuth } from '@/actions';
import { QK } from '@/api-lib';
import { useQuery } from '@tanstack/react-query';
import { TopbarContext } from '@/components/providers';
import { useCallback, useContext } from 'react';
import { useEffect, useState } from 'react';

// use auth
const TIME = 24 * 60 * 60 * 1000;

export const useAuth = () => {
  return useQuery({ queryKey: [QK.AUTH], queryFn: async () => await getAuth(), gcTime: TIME });
};

// use debounce
export const useDebounce = <TData>(value: TData, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<TData>(value);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeOut);
  }, [value, delay]);

  return debouncedValue;
};

// useTopBarContext
export const useTopbarContext = () => {
  const context = useContext(TopbarContext);
  if (!context) throw new Error('You can not access the context form outside');
  return context;
};

// usePopupState
export const usePopupState = () => {
  const [open, setOpen] = useState(false);
  const onOpenChange = useCallback((open: boolean) => setOpen(open), []);

  return { open, onOpenChange };
};
