import { useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

// use auth

export const useAuth = () => {
  const { data } = useSession();
  if (!data) return null;
  return data.user;
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

// usePopupState
export const usePopupState = () => {
  const [open, setOpen] = useState(false);
  const onOpenChange = useCallback((open: boolean) => setOpen(open), []);

  return { open, onOpenChange };
};
