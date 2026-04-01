import type { ReactNode } from 'react';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export function Button({ variant, children, onClick, type = 'button' }: ButtonProps) {
  const baseClasses = 'h-8 px-4 py-2 text-xs cursor-pointer flex items-center justify-center';
  
  const variantClasses = variant === 'primary' 
    ? 'bg-[#c8a96e] text-[#0d0d0d] border border-[#c8a96e]'
    : 'bg-[#1e1e1e] text-[#f0ede8] border border-[#2a2a2a]';

  return (
    <button 
      type={type}
      className={`${baseClasses} ${variantClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}