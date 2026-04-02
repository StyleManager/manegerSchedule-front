interface SectionHeaderProps {
  title: string;
  action?: {
    label: string;
    onClick?: () => void;
  };
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center h-[52px] px-4 border-b border-[#2a2a2a]">
      <span
        className="text-[11px] text-[#7a7570] uppercase"
        style={{
          fontFamily: 'DM Mono',
          letterSpacing: '2px',
          fontWeight: 'normal',
        }}
      >
        {title}
      </span>
      {action && (
        <span
          className="text-[10px] text-[#c8a96e] cursor-pointer"
          style={{
            fontFamily: 'DM Mono',
            letterSpacing: '1px',
            fontWeight: 'normal',
          }}
          onClick={action.onClick}
        >
          {action.label}
        </span>
      )}
    </div>
  );
}
