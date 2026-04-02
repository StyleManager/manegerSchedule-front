export interface FormInputProps {
  placeholder: string;
  type?: 'text' | 'email' | 'password';
  error?: string;
  value?: string;
}

export function FormInput({
  placeholder,
  type = 'text',
  error,
  value = '',
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        readOnly
        className="w-full h-12 bg-[#1e1e1e] border border-[#2a2a2a] px-3.5 py-3 text-[#7a7570] placeholder-[#7a7570] outline-none box-border"
        style={{
          fontFamily: 'DM Sans',
          fontSize: '13px',
          fontWeight: 'normal',
        }}
      />
      {error && (
        <div
          className="text-[12px] text-[#e05c5c]"
          style={{
            fontFamily: 'DM Sans',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
