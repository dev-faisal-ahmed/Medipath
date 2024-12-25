import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: HomePageComponent,
});

function HomePageComponent() {
  return <div>Hello "/"!</div>;
}
