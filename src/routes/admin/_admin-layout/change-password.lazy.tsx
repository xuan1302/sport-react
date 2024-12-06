import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/admin/_admin-layout/change-password',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/_admin-layout/change-password"!</div>
}
