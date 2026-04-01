const mainItems = [
  'Dashboard',
  'Agendamentos',
  'Clientes',
  'Cabeleireiros',
];

const systemItems = [
  'Serviços',
  'Calendário',
  'Relatórios',
  'Configurações',
];

interface SidebarNavProps {
  activeItem?: string;
}

export function SidebarNav({ activeItem = 'Dashboard' }: SidebarNavProps) {
  return (
    <div className="flex flex-col gap-4 p-5">
      <span 
        className="text-[#7a7570] text-[9px] uppercase tracking-[3px]"
        style={{ fontFamily: '"DM Mono", monospace' }}
      >
        Principal
      </span>
      
      <div className="flex flex-col gap-1">
        {mainItems.map((item) => (
          <div
            key={item}
            className={`h-10 px-6 flex items-center cursor-pointer ${
              item === activeItem 
                ? 'bg-[#1f1a13] border-l-2 border-[#c8a96e]' 
                : ''
            }`}
          >
            <span 
              className={`text-[13px] ${
                item === activeItem ? 'text-[#c8a96e]' : 'text-[#7a7570]'
              }`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>

      <span 
        className="text-[#7a7570] text-[9px] uppercase tracking-[3px] mt-2"
        style={{ fontFamily: '"DM Mono", monospace' }}
      >
        Sistema
      </span>
      
      <div className="flex flex-col gap-1">
        {systemItems.map((item) => (
          <div
            key={item}
            className="h-10 px-6 flex items-center cursor-pointer"
          >
            <span 
              className="text-[#7a7570] text-[13px]"
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}