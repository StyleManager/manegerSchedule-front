import { Panel } from '../Panel';

const servicesData = {
  total: 58,
  breakdown: [
    { name: 'Corte', percent: 48, color: '#c8a96e' },
    { name: 'Barba', percent: 32, color: '#8a6a30' },
    { name: 'Combo', percent: 20, color: '#5a4a20' },
  ],
  metrics: {
    avgAdvance: '18.4h',
    noShowRate: '6.2%',
    newClients: 11,
    remainingSlots: 14,
  },
};

export function ServicesPanel() {
  return (
    <Panel title="Serviços Populares" className="flex-1 p-0">
      <div className="p-5 flex flex-col h-full">
        <div className="flex items-center gap-6 flex-1">
          <div className="relative flex-shrink-0">
            <div 
              className="w-32 h-32 rounded-full"
              style={{
                background: 'conic-gradient(#c8a96e 0% 48%, #8a6a30 48% 80%, #5a4a20 80% 100%, #2a2a2a 100%)',
              }}
            />
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ 
                backgroundColor: '#161616',
                borderRadius: '50%',
                margin: '12px',
              }}
            >
              <span 
                className="text-[#f0ede8] text-4xl font-bold"
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                58
              </span>
              <span 
                className="text-[#7a7570] text-[11px] uppercase tracking-wider"
                style={{ fontFamily: '"DM Mono", monospace' }}
              >
                Total
              </span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div 
              className="text-[#7a7570] text-[11px] uppercase tracking-widest mb-3 font-semibold"
              style={{ fontFamily: '"DM Mono", monospace' }}
            >
              Legenda
            </div>
            {servicesData.breakdown.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 mb-2"
              >
                <div 
                  className="w-4 h-4 flex-shrink-0" 
                  style={{ backgroundColor: item.color }} 
                />
                <span 
                  className="text-[#f0ede8] text-[12px]"
                  style={{ fontFamily: '"DM Sans", sans-serif' }}
                >
                  {item.name}
                </span>
                <span 
                  className="text-[#7a7570] text-[12px] flex-shrink-0"
                  style={{ fontFamily: '"DM Sans", sans-serif' }}
                >
                  {item.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div 
          className="border-t border-[#2a2a2a] pt-4 mt-4"
        >
          <span 
            className="text-[#7a7570] text-[11px] uppercase tracking-widest font-semibold block mb-3"
            style={{ fontFamily: '"DM Mono", monospace' }}
          >
            Métricas Rápidas
          </span>

          <div 
            className="text-[#f0ede8] text-[12px] space-y-2"
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            <div className="flex justify-between">
              <span>Antecedência média</span>
              <span className="text-[#c8a96e]">{servicesData.metrics.avgAdvance}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxa de no-show</span>
              <span className="text-[#c8a96e]">{servicesData.metrics.noShowRate}</span>
            </div>
            <div className="flex justify-between">
              <span>Novos clientes (semana)</span>
              <span className="text-[#c8a96e]">+{servicesData.metrics.newClients}</span>
            </div>
            <div className="flex justify-between">
              <span>Horários restantes hoje</span>
              <span className="text-[#c8a96e]">{servicesData.metrics.remainingSlots}</span>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}