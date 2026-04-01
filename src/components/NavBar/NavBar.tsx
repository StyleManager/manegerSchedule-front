import React from 'react';

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavBarProps {
  hint?: string;
  navLinks?: NavLink[];
}

export const NavBar: React.FC<NavBarProps> = ({
  hint = '',
  navLinks = [
    { label: 'Criar Agendamento', href: '/agendamento', active: true },
    { label: 'Meus Agendamentos', href: '/agendamentos', active: false },
  ],
}) => {
  return (
    <nav
      style={{
        backgroundColor: '#0d0d0d',
        borderBottom: '1px solid #2a2a2a',
        padding: '20px 28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '72px',
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: 'Bebas Neue',
          fontSize: '30px',
          fontWeight: 'normal',
          letterSpacing: '2px',
          color: '#c8a96e',
        }}
      >
        STYLE MGR
      </div>

      {/* Center - Hint */}
      <div
        style={{
          fontFamily: 'DM Mono',
          fontSize: '11px',
          fontWeight: 'normal',
          letterSpacing: '1px',
          color: '#7a7570',
        }}
      >
        {hint}
      </div>

      {/* Right - Navigation Links */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
        }}
      >
        {navLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            style={{
              fontFamily: 'DM Mono',
              fontSize: '11px',
              fontWeight: 'normal',
              letterSpacing: '1px',
              color: link.active ? '#c8a96e' : '#7a7570',
              textDecoration: 'none',
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
};
