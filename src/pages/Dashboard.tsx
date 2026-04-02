import { MetricsRow } from '../components/Dashboard/MetricsRow';
import { SchedulePanel } from '../components/Dashboard/SchedulePanel';
import { CalendarPanel } from '../components/Dashboard/CalendarPanel';
import { WeeklyChart } from '../components/Dashboard/WeeklyChart';
import { BarberList } from '../components/Dashboard/BarberList';
import { ServicesPanel } from '../components/Dashboard/ServicesPanel';

export function Dashboard() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <MetricsRow />
      
      <div className="flex gap-4 flex-1 min-h-0">
        <SchedulePanel />
        <CalendarPanel />
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        <WeeklyChart />
        <BarberList />
        <ServicesPanel />
      </div>
    </div>
  );
}