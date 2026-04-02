import React, { createContext, useState } from 'react';

export interface BookingState {
  serviceId: string | null;
  serviceName: string | null;
  servicePrice: number | null;

  professionalId: string | null;
  professionalName: string | null;

  date: string | null;
  time: string | null;
}

export interface BookingContextType {
  booking: BookingState;
  setService: (id: string, name: string, price: number) => void;
  setProfessional: (id: string, name: string) => void;
  setDateTime: (date: string, time: string) => void;
  resetBooking: () => void;
}

const initialState: BookingState = {
  serviceId: null,
  serviceName: null,
  servicePrice: null,
  professionalId: null,
  professionalName: null,
  date: null,
  time: null,
};

export const BookingContext = createContext<BookingContextType | undefined>(
  undefined
);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(initialState);

  const setService = (id: string, name: string, price: number) => {
    setBooking((prev) => ({
      ...prev,
      serviceId: id,
      serviceName: name,
      servicePrice: price,
    }));
  };

  const setProfessional = (id: string, name: string) => {
    setBooking((prev) => ({
      ...prev,
      professionalId: id,
      professionalName: name,
    }));
  };

  const setDateTime = (date: string, time: string) => {
    setBooking((prev) => ({
      ...prev,
      date,
      time,
    }));
  };

  const resetBooking = () => {
    setBooking(initialState);
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        setService,
        setProfessional,
        setDateTime,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
