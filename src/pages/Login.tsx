import React from 'react';
import { NavBar } from '../components/NavBar';
import { AuthCard, FormInput, AuthButton } from '../components/Auth';
import { getActiveNavLinks } from '../constants/navLinks';

export const Login: React.FC = () => {
  const navLinks = getActiveNavLinks('/login');

  const loginData = {
    email: 'seuemail@email.com',
    password: '••••••••',
  };

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
      <NavBar hint="" navLinks={navLinks} />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px',
        }}
      >
        <AuthCard
          title="Entrar"
          subtitle="Acesse para agendar e acompanhar seus horarios."
          bottomLink={{
            text: 'Nao tem conta? Crie seu cadastro',
            href: '/signup',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Email Input */}
            <FormInput
              placeholder="seuemail@email.com"
              type="email"
              value={loginData.email}
            />

            {/* Password Input */}
            <FormInput
              placeholder="••••••••"
              type="password"
              value={loginData.password}
            />

            {/* Error Message */}
            <div
              style={{
                fontFamily: 'DM Sans',
                fontSize: '12px',
                color: '#e05c5c',
              }}
            >
              Email ou senha invalidos
            </div>

            {/* Submit Button */}
            <AuthButton label="Entrar" />
          </div>
        </AuthCard>
      </div>
    </div>
  );
};
