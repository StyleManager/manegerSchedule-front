import type { ReactNode } from 'react';

interface PanelProps {
  title: string;
  action?: string;
  children: ReactNode;
  className?: string;
}

export function Panel({ title, action, children, className = '' }: PanelProps) {
  return (
    <div className={`bg-[#161616] border border-[#2a2a2a] flex flex-col ${className}`}>
      <div className="h-[52px] border-b border-[#2a2a2a] px-4 flex items-center justify-between">
        <span 
          className="text-[#7a7570] text-[12px] uppercase tracking-widest font-semibold"
          style={{ fontFamily: '"DM Mono", monospace' }}
        >
          {title}
        </span>
        {action && (
          <span 
            className="text-[#c8a96e] text-[10px] uppercase tracking-wider cursor-pointer"
            style={{ fontFamily: '"DM Mono", monospace' }}
          >
            {action}
          </span>
        )}
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}