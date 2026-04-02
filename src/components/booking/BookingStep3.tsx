import { useBooking } from '../../hooks/useBooking';
import { BookingStepContainer } from './BookingStepContainer';

interface BookingStep3Props {
  onContinue: () => void;
  onBack: () => void;
  onCancel: () => void;
}

const DAYS_OF_WEEK = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const APRIL_2026_FIRST_DAY = 3; // Wednesday
const APRIL_2026_DAYS = 30;

export function BookingStep3({ onContinue, onBack, onCancel }: BookingStep3Props) {
  const { booking, setDateTime } = useBooking();

  const handleSelectDate = (day: number) => {
    const dateStr = `2026-04-${String(day).padStart(2, '0')}`;
    setDateTime(dateStr, booking.time || '');
  };

  const canContinue = booking.date !== null;

  // Generate calendar grid
  const calendarDays: (number | null)[] = [
    ...Array(APRIL_2026_FIRST_DAY).fill(null),
    ...Array.from({ length: APRIL_2026_DAYS }, (_, i) => i + 1),
  ];

  const selectedDay = booking.date ? parseInt(booking.date.split('-')[2]) : null;

  return (
    <BookingStepContainer
      step={3}
      title="Escolha a Data"
      onContinue={onContinue}
      onBack={onBack}
      onCancel={onCancel}
      canContinue={canContinue}
    >
      <div className="bg-[#1e1e1e] p-6">
        {/* Month/Year header */}
        <div
          style={{
            fontFamily: 'DM Mono',
            fontSize: '16px',
            color: '#c8a96e',
            textAlign: 'center',
            marginBottom: '24px',
            fontWeight: '600',
          }}
        >
          Abril 2026
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {DAYS_OF_WEEK.map((day, index) => (
            <div
              key={`day-${index}`}
              style={{
                fontFamily: 'DM Mono',
                fontSize: '12px',
                color: '#7a7570',
                textAlign: 'center',
                padding: '8px',
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => (
            <button
              key={index}
              onClick={() => day !== null && handleSelectDate(day)}
              disabled={day === null}
              className={`h-12 transition ${
                day === null
                  ? 'cursor-default'
                  : selectedDay === day
                    ? 'bg-[#c8a96e] text-[#0d0d0d] cursor-pointer hover:opacity-90'
                    : 'bg-[#0d0d0d] border border-[#2a2a2a] text-[#f0ede8] cursor-pointer hover:border-[#7a7570]'
              }`}
              style={{
                fontFamily: 'DM Mono',
                fontSize: '14px',
              }}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </BookingStepContainer>
  );
}
