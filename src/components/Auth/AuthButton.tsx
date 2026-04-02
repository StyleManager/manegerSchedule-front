export interface AuthButtonProps {
  label: string;
  onClick?: () => void;
}

export function AuthButton({ label, onClick }: AuthButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full h-12 bg-[#c8a96e] text-[#0d0d0d] border-0 px-4 py-3 cursor-pointer transition-opacity hover:opacity-90"
      style={{
        fontFamily: 'DM Sans',
        fontSize: '14px',
        fontWeight: '500',
      }}
    >
      {label}
    </button>
  );
}
