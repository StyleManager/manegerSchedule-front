import { SidebarLogo } from './SidebarLogo';
import { SidebarNav } from './SidebarNav';
import { SidebarFooter } from './SidebarFooter';

interface SidebarProps {
  activeItem?: string;
}

export function Sidebar({ activeItem }: SidebarProps) {
  return (
    <aside className="w-[220px] h-[1024px] bg-[#161616] border-r border-[#2a2a2a] flex flex-col">
      <SidebarLogo />
      <SidebarNav activeItem={activeItem} />
      <SidebarFooter />
    </aside>
  );
}