import { Panel } from '../Panel';

const barbers = [
  { name: 'Carlos Santos', count: 5, services: 'Corte Barba Pigmentação' },
  { name: 'Andre Lima', count: 4, services: 'Corte Degradê' },
  { name: 'Marcos Pinto', count: 3, services: 'Corte Barba Sobrancelha' },
];

export function BarberList() {
  return (
    <Panel title="Cabeleireiros" className="flex-1">
      <div className="flex flex-col gap-0 p-5">
        {barbers.map((barber, index) => (
          <div key={index} className="py-4">
            <div className="flex justify-between items-center mb-2">
              <span 
                className="text-[#f0ede8] text-[13px] font-medium"
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                {barber.name}
              </span>
              <span 
                className="text-[#c8a96e] text-[12px]"
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                {barber.count} hoje
              </span>
            </div>
            <div 
              className="text-[#7a7570] text-[11px]"
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              {barber.services}
            </div>
            {index < barbers.length - 1 && (
              <div className="border-b border-[#2a2a2a] mt-4" />
            )}
          </div>
        ))}
      </div>
    </Panel>
  );
}