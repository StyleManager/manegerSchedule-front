import { Panel } from '../Panel';

const weeklyData = [
  { value: 62, label: 'DOM' },
  { value: 78, label: 'SEG' },
  { value: 55, label: 'TER' },
  { value: 88, label: 'QUA' },
  { value: 72, label: 'QUI' },
  { value: 95, label: 'SEX' },
  { value: 45, label: 'SAB' },
];

export function WeeklyChart() {
  return (
    <Panel title="Agendamentos / Semana" action="export" className="flex-1">
      <div className="h-full p-5 flex flex-col">
        <div className="flex-1 flex items-end gap-2">
          {weeklyData.map((day, index) => (
            <div
              key={index}
              className="flex-1"
              style={{
                height: `${(day.value / 100) * 200}px`,
                backgroundColor: index === 6 ? '#e8c887' : '#c8a96e',
              }}
            />
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          {weeklyData.map((day, index) => (
            <div
              key={index}
              className="flex-1 text-center text-[#7a7570] text-[11px] uppercase tracking-wider font-semibold"
              style={{ fontFamily: '"DM Mono", monospace' }}
            >
              {day.label}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}