export function SidebarFooter() {
  return (
    <div className="h-[76px] border-t border-[#2a2a2a] px-6 flex items-center gap-2.5">
      <div 
        className="w-8 h-8 rounded-full"
        style={{
          background: 'linear-gradient(130deg, #c8a96e, #8a6a30)',
        }}
      />
      <div className="flex flex-col">
        <span 
          className="text-[#f0ede8] text-xs leading-tight"
          style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
          Admin
        </span>
        <span 
          className="text-[#f0ede8] text-xs text-[#7a7570]"
          style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
          ROOT - ONLINE
        </span>
      </div>
    </div>
  );
}