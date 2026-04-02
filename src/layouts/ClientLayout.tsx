import { Outlet } from 'react-router-dom';
import { NavBar } from '../components/NavBar';

export function ClientLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0d0d0d]">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
