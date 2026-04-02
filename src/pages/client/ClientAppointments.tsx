export function ClientAppointments() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Page Header */}
      <div className="flex flex-col items-center gap-2">
        <h1
          className="text-[38px] text-[#f0ede8] m-0"
          style={{
            fontFamily: 'Bebas Neue',
            fontWeight: 'normal',
            letterSpacing: '1px',
          }}
        >
          Meus Agendamentos
        </h1>
        <p
          className="text-[11px] text-[#7a7570] m-0"
          style={{
            fontFamily: 'DM Mono',
            letterSpacing: '1px',
          }}
        >
          Consulte seus agendamentos confirmados
        </p>
      </div>

      {/* Empty State - Centered Content */}
      <div className="flex flex-col items-center justify-center gap-6 min-h-[400px]">
        <p
          className="text-[14px] text-[#7a7570]"
          style={{
            fontFamily: 'DM Sans',
            fontWeight: 'normal',
          }}
        >
          Você ainda não possui agendamentos.
        </p>
        <a
          href="/client/booking/1"
          className="px-8 py-3 bg-[#c8a96e] text-[#0d0d0d] cursor-pointer transition-all hover:bg-[#d4b876]"
          style={{
            fontFamily: 'DM Sans',
            fontSize: '14px',
            fontWeight: '500',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          Criar Agendamento
        </a>
      </div>
    </div>
  );
}
