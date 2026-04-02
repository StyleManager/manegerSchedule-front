interface ListItemProps {
  columns: Array<{
    value: string;
    weight?: 'normal' | 'bold';
    color?: string;
  }>;
  gap?: string;
}

export function ListItem({ columns, gap = 'gap-4' }: ListItemProps) {
  return (
    <div className={`flex items-center pb-4 border-b border-[#2a2a2a] last:border-b-0 ${gap}`}>
      {columns.map((column, index) => (
        <span
          key={index}
          className="flex-1 text-[12px]"
          style={{
            fontFamily: 'DM Sans',
            fontWeight: column.weight === 'bold' ? '500' : 'normal',
            color: column.color || '#f0ede8',
          }}
        >
          {column.value}
        </span>
      ))}
    </div>
  );
}
