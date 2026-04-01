import React from 'react';
import type { ReactNode } from 'react';

export interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  bottomLink?: {
    text: string;
    href: string;
  };
}

export const AuthCard: React.FC<AuthCardProps> = ({
  title,
  subtitle,
  children,
  bottomLink,
}) => {
  return (
    <div
      style={{
        width: '440px',
        backgroundColor: '#161616',
        border: '1px solid #2a2a2a',
        borderRadius: '4px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Title */}
      <div
        style={{
          fontFamily: 'Bebas Neue',
          fontSize: '42px',
          fontWeight: 'normal',
          letterSpacing: '1px',
          color: '#f0ede8',
        }}
      >
        {title}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: 'DM Sans',
          fontSize: '14px',
          fontWeight: 'normal',
          lineHeight: '1.5',
          color: '#7a7570',
        }}
      >
        {subtitle}
      </div>

      {/* Children (Form Content) */}
      {children}

      {/* Bottom Link */}
      {bottomLink && (
        <a
          href={bottomLink.href}
          style={{
            fontFamily: 'DM Sans',
            fontSize: '13px',
            fontWeight: 'normal',
            color: '#c8a96e',
            textDecoration: 'none',
          }}
        >
          {bottomLink.text}
        </a>
      )}
    </div>
  );
};
