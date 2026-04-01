import React from 'react';

export interface FormInputProps {
  placeholder: string;
  type?: 'text' | 'email' | 'password';
  error?: string;
  value?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  placeholder,
  type = 'text',
  error,
  value = '',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}
    >
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        readOnly
        style={{
          width: '100%',
          height: '48px',
          backgroundColor: '#1e1e1e',
          border: '1px solid #2a2a2a',
          borderRadius: '3px',
          padding: '0 14px',
          fontFamily: 'DM Sans',
          fontSize: '13px',
          fontWeight: 'normal',
          color: '#7a7570',
          boxSizing: 'border-box',
          outline: 'none',
        }}
      />
      {error && (
        <div
          style={{
            fontFamily: 'DM Sans',
            fontSize: '12px',
            color: '#e05c5c',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};
