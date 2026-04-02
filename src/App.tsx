import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClientLayout, DashboardLayout } from "./layouts";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ClientBooking } from "./pages/client/ClientBooking";
import { ClientAppointments } from "./pages/client/ClientAppointments";
import { BookingProvider } from "./context/BookingContext";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookingProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<ClientLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/client/booking/:step" element={<ClientBooking />} />
              <Route path="/client/appointments" element={<ClientAppointments />} />
            </Route>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BookingProvider>
    </QueryClientProvider>
  );
}