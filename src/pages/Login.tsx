import { AuthCard, FormInput, AuthButton } from '../components/Auth';

export function Login() {
  const loginData = {
    email: 'seuemail@email.com',
    password: '••••••••',
  };

  return (
    <div className="flex-1 flex justify-center items-center px-6 py-6 bg-[#0d0d0d]">
      <AuthCard
        title="Entrar"
        subtitle="Acesse para agendar e acompanhar seus horarios."
        bottomLink={{
          text: 'Nao tem conta? Crie seu cadastro',
          href: '/signup',
        }}
      >
        <div className="flex flex-col gap-4">
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
            className="text-xs text-[#e05c5c]"
            style={{
              fontFamily: 'DM Sans',
            }}
          >
            Email ou senha invalidos
          </div>

          {/* Submit Button */}
          <AuthButton label="Entrar" />
        </div>
      </AuthCard>
    </div>
  );
}
