import { Badge } from '../Badge';
import { Button } from '../Button';

export function Topbar() {
  const today = new Date();
  const dateStr = today.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).toUpperCase();

  return (
    <header className="h-[86px] px-9 border-b border-[#2a2a2a] flex items-center justify-between">
      <div className="flex flex-col gap-0.5">
        <h1 
          className="text-[#f0ede8] text-[32px] leading-none tracking-[2px]"
          style={{ fontFamily: '"Bebas Neue", sans-serif' }}
        >
          DASHBOARD
        </h1>
        <span 
          className="text-[#7a7570] text-[11px] tracking-wider"
          style={{ fontFamily: '"DM Mono", monospace' }}
        >
          {dateStr.replace(',', ',')}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Badge text="AO VIVO" />
        <Button variant="secondary">Atualizar</Button>
        <Button variant="primary">+ Novo Agendamento</Button>
      </div>
    </header>
  );
}