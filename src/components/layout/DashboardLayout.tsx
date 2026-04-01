import type { ReactNode } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { Topbar } from '../Topbar/Topbar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#0d0d0d]">
      <Sidebar activeItem="Dashboard" />
      <main className="flex-1 flex flex-col">
        <Topbar />
        <div className="flex-1 p-8 flex flex-col min-h-0">
          {children}
        </div>
      </main>
    </div>
  );
}