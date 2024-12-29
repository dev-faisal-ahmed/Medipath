import { createFileRoute, Outlet } from '@tanstack/react-router';

interface ISearch {
  searchTerms: string;
  sort: string;
  page: string;
  limit: string;
}

export const Route = createFileRoute('/_private/services')({
  validateSearch: (search: Record<string, string>): ISearch => {
    return {
      searchTerms: search.searchTerms,
      sort: search.sort,
      page: search.page || '1',
      limit: search.limit || '20',
    };
  },
  component: () => <Outlet />,
});
