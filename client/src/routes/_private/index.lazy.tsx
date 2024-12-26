import { HomePage } from '@/pages/home/home-page';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_private/')({
  component: HomePage,
});
