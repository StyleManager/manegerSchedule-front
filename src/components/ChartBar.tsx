interface ChartBarProps {
  height: number;
  color?: string;
  label?: string;
}

export function ChartBar({ height, color = '#c8a96e', label }: ChartBarProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-full"
        style={{
          height: `${height}px`,
          backgroundColor: color,
        }}
      />
      {label && (
        <span
          className="text-[11px]"
          style={{
            fontFamily: 'DM Mono',
            color: '#7a7570',
            fontWeight: 'normal',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
