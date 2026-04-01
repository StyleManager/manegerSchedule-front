import { Panel } from '../Panel';

const todaySchedule = [
  { time: '09:00', client: 'Rafael Mendes', barber: 'Carlos S.', status: 'Confirmado' },
  { time: '10:00', client: 'João Oliveira', barber: 'Andre L.', status: 'Confirmado' },
  { time: '11:00', client: 'Bruno Costa', barber: 'Carlos S.', status: 'Pendente' },
  { time: '13:00', client: 'Felipe Souza', barber: 'Marcos P.', status: 'Confirmado' },
  { time: '14:00', client: 'Lucas Ferreira', barber: 'Andre L.', status: 'Cancelado' },
  { time: '15:00', client: 'Diego Alves', barber: 'Carlos S.', status: 'Pendente' },
];

function getStatusColor(status: string) {
  switch (status) {
    case 'Confirmado': return '#5ce0a0';
    case 'Pendente': return '#c8a96e';
    case 'Cancelado': return '#e05c5c';
    default: return '#7a7570';
  }
}

export function SchedulePanel() {
  return (
    <Panel title="Agendamentos de Hoje" action="ver todos ->" className="flex-1 p-0">
      <div 
        className="text-[#f0ede8] text-[13px] p-5"
        style={{ fontFamily: '"DM Mono", monospace' }}
      >
        <div className="text-[#7a7570] mb-4 text-[11px] uppercase tracking-wider grid grid-cols-12 gap-2">
          <span className="col-span-2">Horário</span>
          <span className="col-span-4">Cliente</span>
          <span className="col-span-3">Cabeleireiro</span>
          <span className="col-span-3">Status</span>
        </div>
        {todaySchedule.map((item, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 py-3 border-b border-[#2a2a2a] last:border-b-0">
            <span className="col-span-2 truncate text-[12px]">{item.time}</span>
            <span className="col-span-4 truncate text-[12px]">{item.client}</span>
            <span className="col-span-3 truncate text-[12px]">{item.barber}</span>
            <span className="col-span-3 truncate text-[12px]" style={{ color: getStatusColor(item.status) }}>{item.status}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}