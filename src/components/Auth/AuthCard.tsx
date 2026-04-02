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

export function AuthCard({
  title,
  subtitle,
  children,
  bottomLink,
}: AuthCardProps) {
  return (
    <div className="w-[440px] bg-[#161616] border border-[#2a2a2a] rounded p-6 flex flex-col gap-4">
      {/* Title */}
      <div
        className="text-[42px] text-[#f0ede8]"
        style={{
          fontFamily: 'Bebas Neue',
          fontWeight: 'normal',
          letterSpacing: '1px',
        }}
      >
        {title}
      </div>

      {/* Subtitle */}
      <div
        className="text-[14px] text-[#7a7570] leading-[1.5]"
        style={{
          fontFamily: 'DM Sans',
          fontWeight: 'normal',
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
          className="text-[13px] text-[#c8a96e]"
          style={{
            fontFamily: 'DM Sans',
            fontWeight: 'normal',
            textDecoration: 'none',
          }}
        >
          {bottomLink.text}
        </a>
      )}
    </div>
  );
}
