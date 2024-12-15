import { Outlet, createRootRoute } from '@tanstack/react-router';
import { ConfigProvider } from 'antd';
import * as React from 'react';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <ConfigProvider>
        <div className='w-full min-h-screen'>
          <Outlet />
        </div>
      </ConfigProvider>
      {/* <TanStackRouterDevtools /> */}
    </React.Fragment>
  );
}
