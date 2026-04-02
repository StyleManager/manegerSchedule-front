import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Topbar } from '../components/Topbar/Topbar';

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#0d0d0d]">
      <Sidebar activeItem="Dashboard" />
      <main className="flex-1 flex flex-col">
        <Topbar />
        <div className="flex-1 p-8 flex flex-col min-h-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}