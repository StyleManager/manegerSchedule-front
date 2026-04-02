import { AuthCard, FormInput, AuthButton } from '../components/Auth';

export function Signup() {
  const signupData = {
    fullName: 'Seu Nome Completo',
    email: 'seuemail@email.com',
    password: '••••••••',
    confirmPassword: '••••••••',
  };

  return (
    <div className="flex-1 flex justify-center items-center px-6 py-6 bg-[#0d0d0d]">
      <AuthCard
        title="Cadastro"
        subtitle="Crie sua conta para concluir agendamentos em poucos passos."
        bottomLink={{
          text: 'Ja tem conta? Faça login',
          href: '/login',
        }}
      >
        <div className="flex flex-col gap-3.5">
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
  );
}
