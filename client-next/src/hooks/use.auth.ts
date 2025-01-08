import { getAuth } from '@/actions';
import { QUERY_KEYS } from '@/api-lib';
import { useQuery } from '@tanstack/react-query';

const TIME = 24 * 60 * 60 * 1000;

export function useAuth() {
  return useQuery({ queryKey: [QUERY_KEYS.AUTH], queryFn: async () => await getAuth(), gcTime: TIME });
}
