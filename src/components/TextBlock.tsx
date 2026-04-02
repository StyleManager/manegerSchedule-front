type TextVariant = 'label' | 'value' | 'description' | 'mono';

interface TextBlockProps {
  content: string;
  variant: TextVariant;
  className?: string;
}

export function TextBlock({ content, variant, className = '' }: TextBlockProps) {
  const variantStyles: Record<TextVariant, { fontSize: string; fontFamily: string; color: string }> = {
    'label': {
      fontSize: '10px',
      fontFamily: 'DM Mono',
      color: '#7a7570',
    },
    'value': {
      fontSize: '14px',
      fontFamily: 'DM Sans',
      color: '#f0ede8',
    },
    'description': {
      fontSize: '12px',
      fontFamily: 'DM Sans',
      color: '#7a7570',
    },
    'mono': {
      fontSize: '11px',
      fontFamily: 'DM Mono',
      color: '#f0ede8',
    },
  };

  const style = variantStyles[variant];

  return (
    <span
      className={className}
      style={{
        fontSize: style.fontSize,
        fontFamily: style.fontFamily,
        color: style.color,
        fontWeight: 'normal',
      }}
    >
      {content}
    </span>
  );
}
