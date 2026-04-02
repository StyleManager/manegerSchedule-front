import { useBooking } from '../../hooks/useBooking';
import { BookingStepContainer } from './BookingStepContainer';

interface Service {
  id: string;
  name: string;
  price: number;
}

const SERVICES: Service[] = [
  { id: '1', name: 'Corte', price: 45 },
  { id: '2', name: 'Barba', price: 35 },
  { id: '3', name: 'Corte + Barba', price: 70 },
];

interface BookingStep1Props {
  onContinue: () => void;
  onBack: () => void;
  onCancel: () => void;
}

export function BookingStep1({ onContinue, onBack, onCancel }: BookingStep1Props) {
  const { booking, setService } = useBooking();

  const handleSelectService = (id: string, name: string, price: number) => {
    setService(id, name, price);
  };

  const canContinue = booking.serviceId !== null;

  return (
    <BookingStepContainer
      step={1}
      title="Escolha o Serviço"
      onContinue={onContinue}
      onBack={onBack}
      onCancel={onCancel}
      canContinue={canContinue}
    >
      <div className="grid grid-cols-3 gap-4">
        {SERVICES.map((service) => (
          <button
            key={service.id}
            onClick={() => handleSelectService(service.id, service.name, service.price)}
            className={`p-6 border-2 transition cursor-pointer ${
              booking.serviceId === service.id
                ? 'border-[#c8a96e] bg-[#1e1e1e]'
                : 'border-[#2a2a2a] bg-[#0d0d0d] hover:border-[#7a7570]'
            }`}
          >
            <div
              style={{
                fontFamily: 'DM Sans',
                fontSize: '16px',
                color: '#f0ede8',
                marginBottom: '8px',
                fontWeight: '600',
              }}
            >
              {service.name}
            </div>
            <div
              style={{
                fontFamily: 'DM Mono',
                fontSize: '14px',
                color: '#c8a96e',
              }}
            >
              R$ {service.price}
            </div>
          </button>
        ))}
      </div>
    </BookingStepContainer>
  );
}
