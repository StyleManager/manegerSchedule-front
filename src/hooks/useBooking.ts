import { useContext } from 'react';
import { BookingContext, type BookingContextType } from '../context/BookingContext';

export function useBooking(): BookingContextType {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking deve ser usado dentro de BookingProvider');
  }
  return context;
}
