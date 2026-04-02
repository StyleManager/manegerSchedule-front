import { useBooking } from '../../hooks/useBooking';
import { BookingStepContainer } from './BookingStepContainer';

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00'
];

interface BookingStep4Props {
  onContinue: () => void;
  onBack: () => void;
  onCancel: () => void;
}

export function BookingStep4({ onContinue, onBack, onCancel }: BookingStep4Props) {
  const { booking, setDateTime } = useBooking();

  const handleSelectTime = (time: string) => {
    setDateTime(booking.date || '', time);
  };

  const canContinue = booking.time !== null;

  return (
    <BookingStepContainer
      step={4}
      title="Escolha o Horário"
      onContinue={onContinue}
      onBack={onBack}
      onCancel={onCancel}
      canContinue={canContinue}
    >
      <div className="grid grid-cols-5 gap-3">
        {TIME_SLOTS.map((time) => (
          <button
            key={time}
            onClick={() => handleSelectTime(time)}
            className={`h-12 transition border-2 ${
              booking.time === time
                ? 'bg-[#c8a96e] text-[#0d0d0d] border-[#c8a96e]'
                : 'bg-[#0d0d0d] border-[#2a2a2a] text-[#f0ede8] hover:border-[#7a7570]'
            }`}
            style={{
              fontFamily: 'DM Mono',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            {time}
          </button>
        ))}
      </div>
    </BookingStepContainer>
  );
}
