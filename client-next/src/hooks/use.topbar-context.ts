import { TopbarContext } from '@/components/providers';
import { useContext } from 'react';

export function useTopbarContext() {
  const context = useContext(TopbarContext);
  if (!context) throw new Error('You can not access the context form outside');
  return context;
}
