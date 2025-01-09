import { useEffect, useState } from 'react';

export function useDebounce<TData>(value: TData, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState<TData>(value);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeOut);
  }, [value, delay]);

  return debouncedValue;
}
