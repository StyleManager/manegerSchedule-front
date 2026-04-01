import React from 'react';
import { NavBar } from '../components/NavBar';

export const Home: React.FC = () => {
  const navLinks = [
    { label: 'Login', href: '/login', active: false },
    { label: 'Cadastro', href: '/signup', active: false },
    { label: 'Area do Cliente', href: '/agendamento', active: false },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#0d0d0d',
      }}
    >
      {/* NavBar */}
      <NavBar navLinks={navLinks} />

      {/* Main Content - Simple Hero Section */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'Bebas Neue',
            fontSize: '48px',
            fontWeight: 'normal',
            letterSpacing: '2px',
            color: '#f0ede8',
            marginBottom: '16px',
          }}
        >
          STYLE MANAGER
        </div>

        <div
          style={{
            fontFamily: 'DM Sans',
            fontSize: '18px',
            fontWeight: 'normal',
            color: '#7a7570',
            maxWidth: '600px',
            lineHeight: '1.6',
          }}
        >
          Sistema de gerenciamento de agendamentos para barbearias. Cadastre-se ou faça login para agendar seus horarios.
        </div>
      </div>
    </div>
  );
};