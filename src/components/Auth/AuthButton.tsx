import React from 'react';

export interface AuthButtonProps {
  label: string;
  onClick?: () => void;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        height: '48px',
        backgroundColor: '#c8a96e',
        color: '#0d0d0d',
        border: 'none',
        borderRadius: '3px',
        fontFamily: 'DM Sans',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'opacity 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      {label}
    </button>
  );
};
