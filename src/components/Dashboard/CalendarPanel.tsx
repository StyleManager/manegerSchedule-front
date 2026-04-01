const alerts = [
  { icon: '!', text: '7 agendamentos aguardando confirmação', time: 'há 15 min' },
  { icon: '+', text: 'Calendário gerado para próximos 7 dias', time: 'hoje, 00:00' },
  { icon: '-', text: '14:00 - Horário liberado (cancelamento)', time: 'há 42 min' },
];

export function CalendarPanel() {
  return (
    <div className="flex-1 bg-[#161616] border border-[#2a2a2a] flex flex-col">
      <div className="h-[52px] border-b border-[#2a2a2a] px-4 flex items-center justify-between">
        <span 
          className="text-[#7a7570] text-[12px] uppercase tracking-widest font-semibold"
          style={{ fontFamily: '"DM Mono", monospace' }}
        >
          Calendário
        </span>
        <span 
          className="text-[#c8a96e] text-[11px] uppercase tracking-wider"
          style={{ fontFamily: '"DM Mono", monospace' }}
        >
          Fev 2026
        </span>
      </div>

      <div 
        className="p-5 text-[#f0ede8] text-[12px] leading-[1.8] flex-1"
        style={{ fontFamily: '"DM Mono", monospace' }}
      >
        <div className="text-[#7a7570] mb-3 text-[11px] uppercase tracking-wider">Fevereiro 2026</div>
        <div className="whitespace-pre text-[13px] leading-[1.8]">D  S  T  Q  Q  S  S
                1
2  3  4  5  6  7  8
9 10 11 12 13 14 15
16 17 18 19 20 21 22
23 24 25 26 27 28</div>
      </div>

      <div className="h-[44px] border-t border-b border-[#2a2a2a] flex items-center px-4">
        <span 
          className="text-[#7a7570] text-[12px] uppercase tracking-widest font-semibold"
          style={{ fontFamily: '"DM Mono", monospace' }}
        >
          Alertas
        </span>
      </div>

      <div 
        className="p-5 text-[#f0ede8] text-[12px] leading-[1.8] flex-1 overflow-y-auto"
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      >
        {alerts.map((alert, index) => (
          <div key={index} className="mb-4 last:mb-0">
            <span className="text-[#c8a96e] font-bold mr-1">{alert.icon}</span>
            <span className="break-words">{alert.text}</span>
            <div className="text-[#7a7570] text-[11px] mt-1">{alert.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}