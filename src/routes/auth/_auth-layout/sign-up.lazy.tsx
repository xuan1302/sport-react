import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/auth/_auth-layout/sign-up')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/auth/_auth-layout/sign-up"!</div>;
}
