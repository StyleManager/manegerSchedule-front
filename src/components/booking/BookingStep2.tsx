import { useBooking } from '../../hooks/useBooking';
import { BookingStepContainer } from './BookingStepContainer';

interface Professional {
  id: string;
  name: string;
  specialties: string;
}

const PROFESSIONALS: Professional[] = [
  { id: '1', name: 'Carlos Santos', specialties: 'Corte/Barba' },
  { id: '2', name: 'Andre Lima', specialties: 'Degrade' },
  { id: '3', name: 'Marcos Pinto', specialties: 'Corte/Barba' },
];

interface BookingStep2Props {
  onContinue: () => void;
  onBack: () => void;
  onCancel: () => void;
}

export function BookingStep2({ onContinue, onBack, onCancel }: BookingStep2Props) {
  const { booking, setProfessional } = useBooking();

  const handleSelectProfessional = (id: string, name: string) => {
    setProfessional(id, name);
  };

  const canContinue = booking.professionalId !== null;

  return (
    <BookingStepContainer
      step={2}
      title="Escolha o Profissional"
      onContinue={onContinue}
      onBack={onBack}
      onCancel={onCancel}
      canContinue={canContinue}
    >
      <div className="flex flex-col gap-3">
        {PROFESSIONALS.map((professional) => (
          <button
            key={professional.id}
            onClick={() => handleSelectProfessional(professional.id, professional.name)}
            className={`h-16 px-6 border-2 transition cursor-pointer flex items-center justify-between ${
              booking.professionalId === professional.id
                ? 'border-[#c8a96e] bg-[#1e1e1e]'
                : 'border-[#2a2a2a] bg-[#0d0d0d] hover:border-[#7a7570]'
            }`}
          >
            <div className="text-left">
              <div
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '16px',
                  color: '#f0ede8',
                  fontWeight: '600',
                }}
              >
                {professional.name}
              </div>
              <div
                style={{
                  fontFamily: 'DM Mono',
                  fontSize: '12px',
                  color: '#7a7570',
                  marginTop: '4px',
                }}
              >
                {professional.specialties}
              </div>
            </div>
          </button>
        ))}
      </div>
    </BookingStepContainer>
  );
}
