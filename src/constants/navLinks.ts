import type { NavLink } from '../components/NavBar';

// Links de navegação padronizados para todas as páginas
export const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: 'Login', href: '/login', active: false },
  { label: 'Cadastro', href: '/signup', active: false },
  { label: 'Area do Cliente', href: '/agendamento', active: false },
  { label: 'Agendar', href: '/agendamento', active: false },
];

/**
 * Retorna os links com o link ativo destacado baseado na rota atual
 * @param currentPath - Caminho atual (ex: '/login')
 * @returns Array de NavLink com o link ativo marcado
 */
export const getActiveNavLinks = (currentPath: string): NavLink[] => {
  return DEFAULT_NAV_LINKS.map(link => ({
    ...link,
    active: link.href === currentPath,
  }));
};
