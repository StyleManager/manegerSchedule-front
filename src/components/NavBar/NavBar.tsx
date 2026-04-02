import { useLocation } from 'react-router-dom';

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavBarProps {
  navLinks?: NavLink[];
}

export function NavBar({
  navLinks = [
    { label: 'Home', href: '/', active: true },
    { label: 'Login', href: '/login', active: true },
    { label: 'Criar Agendamento', href: '/client/booking/1', active: true },
    { label: 'Meus Agendamentos', href: '/client/appointments', active: false },
  ],
}: NavBarProps) {
  const location = useLocation();
  const isClientPage = location.pathname.startsWith('/client');
  const showHint = isClientPage ? 'Area do Cliente' : '';

  return (
    <nav className="flex justify-between items-center h-[72px] px-7 border-b border-[#2a2a2a] bg-[#0d0d0d]">
      {/* Logo */}
      <div
        className="text-[30px] text-[#c8a96e]"
        style={{
          fontFamily: 'Bebas Neue',
          letterSpacing: '2px',
          fontWeight: 'normal',
        }}
      >
        STYLE MGR
      </div>

      {/* Center - Hint */}
      <div
        className="text-[11px] text-[#7a7570]"
        style={{
          fontFamily: 'DM Mono',
          letterSpacing: '1px',
          fontWeight: 'normal',
        }}
      >
        {showHint}
      </div>

      {/* Right - Navigation Links */}
      <div className="flex gap-4 items-center">
        {isClientPage && (
          <>
            <a
              href="/client/booking/1"
              className="text-[#c8a96e]"
              style={{
                fontFamily: 'DM Mono',
                fontSize: '11px',
                letterSpacing: '1px',
                fontWeight: 'normal',
                textDecoration: 'none',
              }}
            >
              Criar Agendamento
            </a>
            <a
              href="/client/appointments"
              className="text-[#7a7570] hover:text-[#c8a96e] transition"
              style={{
                fontFamily: 'DM Mono',
                fontSize: '11px',
                letterSpacing: '1px',
                fontWeight: 'normal',
                textDecoration: 'none',
              }}
            >
              Meus Agendamentos
            </a>
          </>
        )}
        {!isClientPage && navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={link.active ? 'text-[#c8a96e]' : 'text-[#7a7570]'}
            style={{
              fontFamily: 'DM Mono',
              fontSize: '11px',
              letterSpacing: '1px',
              fontWeight: 'normal',
              textDecoration: 'none',
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
