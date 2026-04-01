import React from 'react';
import { NavBar } from '../components/NavBar';
import { AuthCard, FormInput, AuthButton } from '../components/Auth';

export const Signup: React.FC = () => {
  const navLinks = [
    { label: 'Login', href: '/login', active: false },
    { label: 'Cadastro', href: '/signup', active: true },
  ];

  const signupData = {
    fullName: 'Seu Nome Completo',
    email: 'seuemail@email.com',
    password: '••••••••',
    confirmPassword: '••••••••',
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
          title="Cadastro"
          subtitle="Crie sua conta para concluir agendamentos em poucos passos."
          bottomLink={{
            text: 'Ja tem conta? Faça login',
            href: '/login',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {/* Full Name Input */}
            <FormInput
              placeholder="Seu Nome Completo"
              type="text"
              value={signupData.fullName}
            />

            {/* Email Input */}
            <FormInput
              placeholder="seuemail@email.com"
              type="email"
              value={signupData.email}
            />

            {/* Password Input */}
            <FormInput
              placeholder="••••••••"
              type="password"
              value={signupData.password}
            />

            {/* Confirm Password Input */}
            <FormInput
              placeholder="••••••••"
              type="password"
              value={signupData.confirmPassword}
            />

            {/* Submit Button */}
            <AuthButton label="Criar Conta" />
          </div>
        </AuthCard>
      </div>
    </div>
  );
};
