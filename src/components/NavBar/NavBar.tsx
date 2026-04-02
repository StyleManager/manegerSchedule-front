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
    { label: 'Criar Agendamento', href: '/agendamento', active: true },
    { label: 'Meus Agendamentos', href: '/agendamentos', active: false },
  ],
}: NavBarProps) {
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
      </div>

      {/* Right - Navigation Links */}
      <div className="flex gap-4 items-center">
        {navLinks.map((link) => (
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
