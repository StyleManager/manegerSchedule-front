import { type ReactNode } from 'react';

interface BookingStepContainerProps {
  step: number;
  title: string;
  onContinue: () => void;
  onBack: () => void;
  onCancel: () => void;
  children: ReactNode;
  canContinue?: boolean;
}

export function BookingStepContainer({
  step,
  title,
  onContinue,
  onBack,
  onCancel,
  children,
  canContinue = true,
}: BookingStepContainerProps) {
  return (
    <div className="w-full bg-[#161616] border border-[#2a2a2a] p-6">
      {/* Step indicator */}
      <div style={{ fontFamily: 'DM Mono', fontSize: '11px', color: '#7a7570', marginBottom: '12px' }}>
        Passo {step} de 5
      </div>

      {/* Title */}
      <h2
        style={{ fontFamily: 'Bebas Neue', fontSize: '38px', color: '#f0ede8', marginBottom: '24px' }}
      >
        {title}
      </h2>

      {/* Content */}
      <div className="mb-8">
        {children}
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 justify-between items-center">
        <button
          onClick={onBack}
          disabled={step === 1}
          className={`flex-1 h-12 border border-[#2a2a2a] transition ${
            step === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#7a7570]'
          }`}
          style={{ fontFamily: 'DM Sans', fontSize: '14px', color: '#f0ede8' }}
        >
          Voltar
        </button>

        <button
          onClick={onContinue}
          disabled={!canContinue}
          className={`flex-1 h-12 bg-[#c8a96e] text-[#0d0d0d] transition ${
            !canContinue ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
          }`}
          style={{ fontFamily: 'DM Sans', fontSize: '14px', fontWeight: '600' }}
        >
          {step === 5 ? 'Confirmar Agendamento' : 'Continuar'}
        </button>

        <button
          onClick={onCancel}
          className="flex-1 h-12 border border-[#e05c5c] text-[#e05c5c] transition hover:opacity-80"
          style={{ fontFamily: 'DM Sans', fontSize: '14px' }}
        >
          Desistir
        </button>
      </div>
    </div>
  );
}
