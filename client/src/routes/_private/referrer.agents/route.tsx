import { TObject } from '@/lib/types';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_private/referrer/agents')({
  validateSearch: (searchParams: TObject) => {
    return {
      searchTerms: searchParams.searchTerms,
      page: searchParams.page || '1',
      limit: searchParams.limit || '20',
    };
  },
  component: () => <Outlet />,
});
