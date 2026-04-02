# SPEC-CLIENT-BOOKING.md

## 1. OVERVIEW
Implementação da Área de Cliente com **fluxo de agendamento em 5 passos** com **dados estáticos/mock**.
Sem autenticação nesta fase - foco 100% em layout seguindo Pencil Design.

## 2. ESTRUTURA DE ROTAS

```
/client/booking/1  → Passo 1: Escolher Serviço
/client/booking/2  → Passo 2: Escolher Profissional
/client/booking/3  → Passo 3: Escolher Data
/client/booking/4  → Passo 4: Escolher Horário
/client/booking/5  → Passo 5: Confirmação
```

## 3. LAYOUT PADRÃO - CLIENT AREA

```
┌──────────────────────────────────────────────────────┐
│ STYLE MGR  │  Area do Cliente  │  Criar Agendamento  │
│            │                    │  Meus Agendamentos  │
└──────────────────────────────────────────────────────┘
│                                                       │
│         [Card Centralizado - Step Content]           │
│                                                       │
│                                                       │
└──────────────────────────────────────────────────────┘
```

**Especificações:**
- Height topbar: 72px
- Card width: 860px (centered)
- Background: `#0d0d0d`
- Sem sidebar
- Content padding: 24px

## 4. COMPONENTES

### 4.1 Layout Components

**ClientTopbar**
- Brand: "STYLE MGR" (Bebas Neue 30px, ouro)
- Label: "Area do Cliente" (DM Mono 11px, muted)
- Nav: "Criar Agendamento" (ouro) | "Meus Agendamentos" (muted)
- Height: 72px
- Border bottom: `#2a2a2a`

**ClientLayout**
- Wrapper com Topbar + Body centered
- Body padding: 24px
- Justify center + align center

### 4.2 Booking Components

**BookingStepContainer** (wrapper reutilizável)
```typescript
Props:
- step: number (1-5)
- title: string
- onContinue: () => void
- onBack: () => void
- onCancel: () => void
- children: ReactNode
- canContinue?: boolean = true
```

Estrutura:
```
Card (#161616, border #2a2a2a)
├── "Passo X de 5" (DM Mono, muted)
├── Title (Bebas Neue 38px)
├── [children - conteúdo específico]
└── Actions Row
    ├── [Continuar] button (primary, ouro)
    ├── [Voltar] button (secondary)
    └── [Desistir] button (danger, red)
```

**BookingStep1** (Serviço)
- Grid 3 colunas com cards
- Cada card: nome + preço (R$)
- Card selecionado: border ouro `#c8a96e`
- Card não selecionado: border `#2a2a2a`

**BookingStep2** (Profissional)
- Lista vertical
- Cada item: altura 64px
- Conteúdo: "Nome - Especialidades"
- Selecionado: border ouro

**BookingStep3** (Data)
- Calendário simples (grid texto)
- Mês/Ano no topo (ouro)
- Datas em grid 7 colunas
- Background: `#1e1e1e`

**BookingStep4** (Horário)
- Grid de horários (4-5 colunas)
- Cada slot é um button
- Altura: 48px
- Selecionado: background ouro + text dark

**BookingStep5** (Confirmação)
- Summary dos dados
- Cards mostrando: Serviço, Profissional, Data, Hora
- Botão final: "Confirmar Agendamento"

## 5. STATE MANAGEMENT - BookingContext

```typescript
interface BookingState {
  serviceId: string | null;
  serviceName: string | null;
  servicePrice: number | null;
  
  professionalId: string | null;
  professionalName: string | null;
  
  date: string | null;      // YYYY-MM-DD
  time: string | null;      // HH:mm
}

interface BookingContextType {
  booking: BookingState;
  setService: (id: string, name: string, price: number) => void;
  setProfessional: (id: string, name: string) => void;
  setDateTime: (date: string, time: string) => void;
  resetBooking: () => void;
}
```

## 6. DADOS MOCK

### Serviços (Step 1)
```typescript
[
  { id: '1', name: 'Corte', price: 45 },
  { id: '2', name: 'Barba', price: 35 },
  { id: '3', name: 'Corte + Barba', price: 70 },
]
```

### Profissionais (Step 2)
```typescript
[
  { id: '1', name: 'Carlos Santos', specialties: 'Corte/Barba' },
  { id: '2', name: 'Andre Lima', specialties: 'Degrade' },
  { id: '3', name: 'Marcos Pinto', specialties: 'Corte/Barba' },
]
```

### Calendário (Step 3)
- Abril 2026 (fixo, como no Pencil)
- Grid: D S T Q Q S S
- Datas: 1-30

### Horários (Step 4)
```typescript
[
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00'
]
```

## 7. ESTRUTURA DE PASTAS

```
src/
├── components/
│   ├── layout/
│   │   ├── ClientLayout.tsx
│   │   └── ClientTopbar.tsx
│   └── booking/
│       ├── BookingStepContainer.tsx
│       ├── BookingStep1.tsx
│       ├── BookingStep2.tsx
│       ├── BookingStep3.tsx
│       ├── BookingStep4.tsx
│       └── BookingStep5.tsx
├── context/
│   └── BookingContext.tsx
├── hooks/
│   └── useBooking.ts
└── pages/
    └── client/
        └── ClientBooking.tsx (wrapper para /booking/:step)
```

## 8. CORES & TIPOGRAFIA

| Elemento | Hex | Tailwind |
|----------|-----|----------|
| Bg página | `#0d0d0d` | `bg-[#0d0d0d]` |
| Card | `#161616` | `bg-[#161616]` |
| Input | `#1e1e1e` | `bg-[#1e1e1e]` |
| Border | `#2a2a2a` | `border-[#2a2a2a]` |
| Accent | `#c8a96e` | `bg-[#c8a96e] text-[#c8a96e]` |
| Text primary | `#f0ede8` | `text-[#f0ede8]` |
| Text muted | `#7a7570` | `text-[#7a7570]` |
| Success | `#5ce0a0` | - |
| Error | `#e05c5c` | - |

**Fontes:**
- Titles: Bebas Neue 28-42px
- Labels: DM Mono 9-12px
- Body: DM Sans 12-16px

## 9. FLUXO DE NAVEGAÇÃO

```
Step 1 --[Continuar]--> Step 2 --[Continuar]--> Step 3
  ↑                       ↑                        ↑
  └─────[Voltar]─────────┴────────[Voltar]───────┘

Step 4 --[Continuar]--> Step 5 --[Confirmar]--> Success (mock)
  ↑                       ↑
  └─────[Voltar]─────────┘

[Desistir] em qualquer step → Reset + volta Step 1
```

## 10. VALIDAÇÕES

- **Step 1**: Serviço obrigatório (disable Continuar se não selecionado)
- **Step 2**: Profissional obrigatório
- **Step 3**: Data obrigatória
- **Step 4**: Horário obrigatório
- **Step 5**: Apenas display (botão confirma sem validações)

## 11. NOTAS

- ✅ Dados 100% estáticos/mock
- ✅ Context API para compartilhar estado
- ✅ Sem autenticação
- ✅ Sem API calls
- ✅ Sem persistência (reset ao refresh)
- ✅ Focus: Layout conforme Pencil
- ✅ Border radius: 3-4px (conforme componentes no Pencil)
