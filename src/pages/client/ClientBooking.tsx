import { useNavigate, useParams } from 'react-router-dom';
import { BookingStep1 } from '../../components/booking/BookingStep1';
import { BookingStep2 } from '../../components/booking/BookingStep2';
import { BookingStep3 } from '../../components/booking/BookingStep3';
import { BookingStep4 } from '../../components/booking/BookingStep4';
import { BookingStep5 } from '../../components/booking/BookingStep5';
import { useBooking } from '../../hooks/useBooking';

export function ClientBooking() {
  const navigate = useNavigate();
  const { step = '1' } = useParams<{ step?: string }>();
  const { resetBooking } = useBooking();

  const currentStep = parseInt(step) || 1;
  const validStep = Math.min(Math.max(currentStep, 1), 5);

  const handleContinue = () => {
    if (validStep < 5) {
      navigate(`/client/booking/${validStep + 1}`);
    }
  };

  const handleBack = () => {
    if (validStep > 1) {
      navigate(`/client/booking/${validStep - 1}`);
    }
  };

  const handleCancel = () => {
    resetBooking();
    navigate('/');
  };

  const renderStep = () => {
    switch (validStep) {
      case 1:
        return (
          <BookingStep1
            onContinue={handleContinue}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        );
      case 2:
        return (
          <BookingStep2
            onContinue={handleContinue}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        );
      case 3:
        return (
          <BookingStep3
            onContinue={handleContinue}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        );
      case 4:
        return (
          <BookingStep4
            onContinue={handleContinue}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        );
      case 5:
        return (
          <BookingStep5
            onContinue={() => {
              resetBooking();
              navigate('/');
            }}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-8 px-4">
      <div className="w-full" style={{ maxWidth: '860px' }}>
        {renderStep()}
      </div>
    </div>
  );
}
