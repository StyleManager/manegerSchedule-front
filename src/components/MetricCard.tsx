interface MetricCardProps {
  label: string;
  value: string;
  subtext: string;
  indicatorColor: string;
}

export function MetricCard({ label, value, subtext, indicatorColor }: MetricCardProps) {
  return (
    <div className="relative flex flex-col justify-between flex-1 h-[128px] p-6 bg-[#161616] border border-[#2a2a2a]">
      <div 
        className="absolute top-0 left-0 right-0 h-[2px]" 
        style={{ backgroundColor: indicatorColor }}
      />
      <div>
        <span 
          className="text-[#7a7570] text-[10px] uppercase tracking-widest block mb-2"
          style={{ fontFamily: '"DM Mono", monospace' }}
        >
          {label}
        </span>
        <span 
          className="text-[#f0ede8] text-[42px] leading-tight font-bold"
          style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
          {value}
        </span>
      </div>
      <span 
        className="text-[#7a7570] text-[11px] line-clamp-2"
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      >
        {subtext}
      </span>
    </div>
  );
}