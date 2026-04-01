import { MetricCard } from '../MetricCard';

const metrics = [
  { label: 'HOJE', value: '12', subtext: 'agendamentos   +3', color: '#5ce0a0' },
  { label: 'ESTA SEMANA', value: '58', subtext: 'agendamentos   +8%', color: '#c8a96e' },
  { label: 'TX. CONFIRMAÇÃO', value: '84%', subtext: 'clicaram no email   -2%', color: '#c8a96e' },
  { label: 'PENDENTES', value: '7', subtext: 'aguardando confirmação', color: '#e05c5c' },
];

export function MetricsRow() {
  return (
    <div className="flex gap-4">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          label={metric.label}
          value={metric.value}
          subtext={metric.subtext}
          indicatorColor={metric.color}
        />
      ))}
    </div>
  );
}