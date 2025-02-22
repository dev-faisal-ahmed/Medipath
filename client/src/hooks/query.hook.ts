import { QK } from '@/api-lib';
import { getCategories } from '@/api-lib/query';
import { useTopbarStore } from '@/stores/topbar.store';
import { useQuery } from '@tanstack/react-query';

export const useGetCategories = () => {
  const mode = useTopbarStore((state) => state.mode);
  return useQuery({ queryKey: [QK.CATEGORY, { mode }], queryFn: () => getCategories(mode) });
};
