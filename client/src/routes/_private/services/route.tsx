import { TObject } from '@/lib/types';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_private/services')({
  validateSearch: (search: TObject) => {
    return {
      searchTerms: search.searchTerms,
      sort: search.sort,
      page: search.page || '1',
      limit: search.limit || '20',
    };
  },
  component: () => <Outlet />,
});
