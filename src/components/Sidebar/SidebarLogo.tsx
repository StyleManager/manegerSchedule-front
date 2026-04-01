export function SidebarLogo() {
  return (
    <div className="flex flex-col gap-1 px-6 py-6 border-b border-[#2a2a2a]">
      <span 
        className="text-[#c8a96e] text-[28px] leading-none tracking-[2px]"
        style={{ fontFamily: '"Bebas Neue", sans-serif' }}
      >
        STYLE Manager
      </span>
      <span 
        className="text-[#7a7570] text-[10px] tracking-[3px]"
        style={{ fontFamily: '"DM Mono", monospace' }}
      >
        v1.0.0 - API
      </span>
    </div>
  );
}