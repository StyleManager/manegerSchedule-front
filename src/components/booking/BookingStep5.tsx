import { useBooking } from '../../hooks/useBooking';
import { BookingStepContainer } from './BookingStepContainer';

interface BookingStep5Props {
  onContinue: () => void;
  onBack: () => void;
  onCancel: () => void;
}

function SummaryCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-[#0d0d0d] border border-[#2a2a2a] p-4 mb-4">
      <div
        style={{
          fontFamily: 'DM Mono',
          fontSize: '11px',
          color: '#7a7570',
          marginBottom: '8px',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'DM Sans',
          fontSize: '16px',
          color: '#f0ede8',
          fontWeight: '600',
        }}
      >
        {value}
      </div>
    </div>
  );
}

export function BookingStep5({ onContinue, onBack, onCancel }: BookingStep5Props) {
  const { booking } = useBooking();

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Não selecionado';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <BookingStepContainer
      step={5}
      title="Confirmação"
      onContinue={onContinue}
      onBack={onBack}
      onCancel={onCancel}
      canContinue={true}
    >
      <div className="space-y-4">
        <SummaryCard label="Serviço" value={booking.serviceName || 'Não selecionado'} />
        <SummaryCard label="Profissional" value={booking.professionalName || 'Não selecionado'} />
        <SummaryCard label="Data" value={formatDate(booking.date)} />
        <SummaryCard label="Horário" value={booking.time || 'Não selecionado'} />
        {booking.servicePrice && (
          <SummaryCard label="Valor Total" value={`R$ ${booking.servicePrice}`} />
        )}
      </div>
    </BookingStepContainer>
  );
}
