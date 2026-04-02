type StatusType = 'Confirmado' | 'Pendente' | 'Cancelado';

interface StatusBadgeProps {
  status: StatusType;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusColors: Record<StatusType, string> = {
    'Confirmado': '#5ce0a0',
    'Pendente': '#c8a96e',
    'Cancelado': '#e05c5c',
  };

  const color = statusColors[status];

  return (
    <div
      className="px-2 py-1 text-[12px]"
      style={{
        backgroundColor: color,
        color: '#0d0d0d',
        fontFamily: 'DM Sans',
        fontWeight: 'normal',
      }}
    >
      {status}
    </div>
  );
}
