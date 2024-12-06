import { Outlet, createRootRoute } from '@tanstack/react-router';
import * as React from 'react';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div className='min-h-screen w-full'>
        <Outlet />
      </div>
      {/* <TanStackRouterDevtools /> */}
    </React.Fragment>
  );
}
