interface BadgeProps {
  text: string;
}

export function Badge({ text }: BadgeProps) {
  return (
    <div className="h-6 px-2 py-0.5 bg-[#c8a96e] text-[#0d0d0d] flex items-center">
      <span className="text-[9px] uppercase tracking-wider">{text}</span>
    </div>
  );
}