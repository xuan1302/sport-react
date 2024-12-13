import { createFileRoute, Outlet } from '@tanstack/react-router';
import Footer from '../components/public/footer';
import AppHeader from '../components/public/header';

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='flex flex-col min-h-screen overflow-x-hidden'>
      <AppHeader />
      <div className='flex-1 h-full'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
