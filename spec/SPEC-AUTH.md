# SPEC - Login / Cadastro & NavBar

## 1. Visão Geral

- **Nome**: Login / Cadastro - Área do Cliente
- **Tipo**: Páginas públicas de autenticação
- **Descrição**: Fluxo de autenticação para clientes acessarem a área de agendamentos
- **Referência**: Pencil - Frames "Cliente - Login" (C8oTY) e "Cliente - Cadastro" (DTTXa)

---

## 2. Layout Estrutural

### NavBar (aparece em Login, Cadastro, Home, Área do Cliente)
```
┌──────────────────────────────────────────────────────────┐
│ STYLE MGR    [Hint: Area/Estado]    [Link1]  [Link2]    │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  Login Form / Cadastro Form / Home Content / Cliente UI  │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

### Login & Cadastro (centro da página)
```
┌────────────────────────────┐
│ Titulo                     │
│ Subtitulo                  │
│ ┌──────────────────────┐   │
│ │ Input 1              │   │
│ └──────────────────────┘   │
│ ┌──────────────────────┐   │
│ │ Input 2              │   │
│ └──────────────────────┘   │
│ [Cadastro tem 4 inputs]    │
│                            │
│ ┌──────────────────────┐   │
│ │ Botão Primary        │   │
│ └──────────────────────┘   │
│ Link secundário             │
└────────────────────────────┘
```

---

## 3. Especificação Visual

### Cores
Mesma paleta do Dashboard:
| Token | Hex | Uso |
|-------|-----|-----|
| `--bg-primary` | `#0d0d0d` | Background página |
| `--bg-secondary` | `#161616` | Card |
| `--bg-tertiary` | `#1e1e1e` | Input background |
| `--border` | `#2a2a2a` | Bordas |
| `--accent` | `#c8a96e` | Botão, Links ativos |
| `--text-primary` | `#f0ede8` | Texto principal |
| `--text-secondary` | `#7a7570` | Texto secundário |
| `--danger` | `#e05c5c` | Mensagens de erro |

### Tipografia
| Elemento | Fonte | Tamanho | Letter Spacing |
|----------|-------|---------|----------------|
| Logo | Bebas Neue | 30px | 2px |
| Card Title | Bebas Neue | 42px (Login) / 40px (Cadastro) | 1px |
| Subtítulo | DM Sans | 14px | - |
| Label/Hint | DM Mono | 11px | 1px |
| Input | DM Sans | 13px | - |
| Botão | DM Sans | 14px | - |
| Erro | DM Sans | 12px | - |

### Dimensões
- **NavBar**: 72px altura
- **Card**: 440px largura (centered)
- **Input**: 48px altura
- **Botão**: 48px altura
- **Corner Radius**: 3-4px (inputs e botões)
- **Padding Card**: 24px
- **Gap Card**: 16px (Login), 14px (Cadastro)

---

## 4. Componentes Reutilizáveis

### 4.1 NavBar
**Props:**
```typescript
interface NavBarProps {
  hint?: string;        // "Area do Cliente", "Criar Conta", etc
  navLinks?: NavLink[];
}

interface NavLink {
  label: string;
  href: string;
  active?: boolean;     // Link ativo em ouro
}
```

**Estrutura:**
- Logo "STYLE MGR" (Bebas Neue, #c8a96e)
- Hint text (DM Mono, #7a7570)
- Navigation links (gap 16px)
  - Active link: #c8a96e
  - Inactive link: #7a7570

**Default Links:**
```typescript
const defaultLinks = [
  { label: 'Criar Agendamento', href: '/agendamento', active: true },
  { label: 'Meus Agendamentos', href: '/agendamentos', active: false },
];
```

### 4.2 AuthCard (Componente Reutilizável)
**Props:**
```typescript
interface AuthCardProps {
  title: string;           // "Entrar" ou "Cadastro"
  subtitle: string;        // Texto descritivo
  children: ReactNode;     // Formulário (LoginForm ou SignupForm)
  bottomLink?: {
    text: string;
    href: string;          // Link para outra página
  };
}
```

**Estrutura:**
- Frame bg #161616, stroke 1px #2a2a2a
- Corner radius: 4px
- Padding: 24px
- Gap: 16px
  - Título (Bebas Neue, 42px)
  - Subtítulo (DM Sans, 14px)
  - Conteúdo (children)
  - Link (opcional, DM Sans, #c8a96e)

### 4.3 FormInput (Componente reutilizável simples)
**Props:**
```typescript
interface FormInputProps {
  placeholder: string;
  type?: 'text' | 'email' | 'password';
  error?: string;          // Texto de erro (opcional)
  value?: string;          // Dados estáticos
}
```

**Estrutura:**
- Frame bg #1e1e1e
- Border 1px #2a2a2a
- Corner radius: 3px
- Padding: 0 14px
- Altura: 48px
- Text DM Sans 13px #7a7570

### 4.4 AuthButton (Botão para forms)
**Props:**
```typescript
interface AuthButtonProps {
  label: string;
  onClick?: () => void;
}
```

**Estrutura:**
- Background: #c8a96e
- Text: #0d0d0d (DM Sans, 14px, fontWeight 500)
- Corner radius: 3px
- Altura: 48px
- Width: 100%

---

## 5. Páginas

### 5.1 Login Page (`/login`)

**URL:** `http://localhost:5173/login`

**Estrutura:**
1. NavBar
   - hint: "Area do Cliente"
   - links: [Criar Agendamento (ativo), Meus Agendamentos]

2. Center Content
   - AuthCard
     - title: "Entrar"
     - subtitle: "Acesse para agendar e acompanhar seus horarios."
     - Formulário:
       - Input Email: placeholder "seuemail@email.com"
       - Input Senha: placeholder "********"
       - [Erro opcional: "Email ou senha invalidos" em #e05c5c]
       - Botão "Entrar"
     - bottomLink: "Nao tem conta? Crie seu cadastro" → `/signup`

**Dados Estáticos:**
```typescript
const loginData = {
  email: "seuemail@email.com",
  password: "********",
  error: "Email ou senha invalidos"  // opcional, apenas para demonstração
};
```

### 5.2 Cadastro Page (`/signup`)

**URL:** `http://localhost:5173/signup`

**Estrutura:**
1. NavBar
   - hint: "Criar Conta"
   - links: [Criar Agendamento (ativo), Meus Agendamentos]

2. Center Content
   - AuthCard
     - title: "Cadastro"
     - subtitle: "Crie sua conta para concluir agendamentos em poucos passos."
     - Formulário:
       - Input Nome Completo
       - Input Email
       - Input Senha
       - Input Confirmar Senha
       - Botão "Criar Conta"
     - bottomLink: "Ja tem conta? Faça login" → `/login`

**Dados Estáticos:**
```typescript
const signupData = {
  fullName: "Seu Nome Completo",
  email: "seuemail@email.com",
  password: "••••••••",
  confirmPassword: "••••••••"
};
```

### 5.3 Home Page (`/`)

**URL:** `http://localhost:5173/`

**Estrutura:**
1. NavBar
   - hint: "Home" (ou vazio)
   - links: [Login, Cadastro, Área do Cliente]

2. Hero Section (simples, apenas UI visual)
   - Título + CTAs

---

## 6. Estrutura de Arquivos

```
src/
├── components/
│   ├── NavBar/
│   │   ├── NavBar.tsx
│   │   └── index.ts
│   ├── Auth/
│   │   ├── AuthCard.tsx
│   │   ├── FormInput.tsx
│   │   ├── AuthButton.tsx
│   │   └── index.ts
│   └── [outros componentes]
├── pages/
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── Home.tsx
│   └── [outros pages]
├── App.tsx (definir rotas)
└── [outros arquivos]
```

---

## 7. Dados Estáticos

### Login
```typescript
const loginPlaceholders = {
  email: "seuemail@email.com",
  password: "••••••••",
  errorMessage: "Email ou senha invalidos"
};
```

### Cadastro
```typescript
const signupPlaceholders = {
  fullName: "Seu Nome Completo",
  email: "seuemail@email.com",
  password: "••••••••",
  confirmPassword: "••••••••"
};
```

---

## 8. Routing

```typescript
// App.tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/dashboard" element={<Dashboard />} />
    {/* outras rotas */}
  </Routes>
</BrowserRouter>
```

---

## 9. Notas de Implementação

- ✅ NavBar é componente reutilizável (diferente de cada página)
- ✅ AuthCard é componente reutilizável (mesma estrutura, conteúdo diferente)
- ✅ FormInput é componente reutilizável (mesma UI, dados diferentes)
- ✅ Todos os dados são estáticos (sem validação, sem API)
- ✅ Cores e tipografia seguem spec SPEC-DASHBOARD.md
- ✅ Layout responsivo (mobile-first com TailwindCSS 4)
- ✅ Sem corner radius em cards principais (0px), exceto inputs (3px) e card (4px)

---

## Referências

- **Design**: Pencil frames "Cliente - Login" e "Cliente - Cadastro"
- **Cores/Tipografia**: Mesma paleta de SPEC-DASHBOARD.md
- **Componentes**: Reutilização de padrões estabelecidos
