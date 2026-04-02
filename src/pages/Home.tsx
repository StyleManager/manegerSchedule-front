export function Home() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-8 px-9 py-8 bg-[#0d0d0d]">
      {/* Scissors Icon */}
      <div className="w-30 h-30 bg-[rgba(200,169,110,0.08)] rounded flex items-center justify-center" style={{ transform: 'rotate(125deg)' }}>
        <img
          src="/tesouraIcone.png"
          alt="Tesoura Icon"
          className="w-25 h-25 object-contain"
        />
      </div>

      {/* Title */}
      <div
        className="text-[52px] text-[#f0ede8] text-center m-0"
        style={{
          fontFamily: 'Bebas Neue',
          fontWeight: 'normal',
          letterSpacing: '3px',
        }}
      >
        STYLE MANAGER
      </div>

      {/* Subtitle */}
      <div
        className="text-sm text-[#c8a96e] text-center m-0"
        style={{
          fontFamily: 'DM Mono',
          fontWeight: 'normal',
          letterSpacing: '1px',
        }}
      >
        Sistema de gerenciamento de agendamentos para barbearias
      </div>

      {/* Benefits */}
      <div className="flex flex-col gap-4 px-12 text-center">
        <div
          className="text-sm text-[#8a8580] m-0"
          style={{
            fontFamily: 'DM Sans',
            lineHeight: '1.4',
          }}
        >
          ✓ Agende seus cortes de forma simples e rápida
        </div>
        <div
          className="text-sm text-[#8a8580] m-0"
          style={{
            fontFamily: 'DM Sans',
            lineHeight: '1.4',
          }}
        >
          ✓ Consulte horários disponíveis em tempo real
        </div>
        <div
          className="text-sm text-[#8a8580] m-0"
          style={{
            fontFamily: 'DM Sans',
            lineHeight: '1.4',
          }}
        >
          ✓ Cancele ou remarcue seus agendamentos facilmente
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-6 justify-center items-center">
        <button
          onClick={() => window.location.href = '/signup'}
          className="w-[150px] h-[46px] bg-[#c8a96e] border border-[#a0854a] rounded text-[#0d0d0d] cursor-pointer transition-colors hover:bg-[#d4b876]"
          style={{
            fontFamily: 'DM Sans',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Criar Conta
        </button>

        <button
          onClick={() => window.location.href = '/login'}
          className="w-[150px] h-[46px] bg-transparent border-2 border-[#c8a96e] rounded text-[#c8a96e] cursor-pointer transition-colors hover:bg-[rgba(200,169,110,0.1)]"
          style={{
            fontFamily: 'DM Sans',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}