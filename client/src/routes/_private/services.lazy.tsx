import { ServicesPage } from '@/pages/services/services-page';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_private/services')({
  component: ServicesPage,
});
