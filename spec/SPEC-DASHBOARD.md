# SPEC - StyleManager Dashboard

## 1. Visão Geral

- **Nome**: StyleManager Dashboard
- **Tipo**: Página admin / dashboard
- **Descrição**: Dashboard de gerenciamento de agendamentos para salão de beleza
- **Referência**: Pencil - Frame "StyleManager Dashboard" (MLj6m)

---

## 2. Layout Estrutural

```
┌─────────────────────────────────────────────────────────────────┐
│ Sidebar (220px)        │  Main (1220px)                         │
│                        │  ┌─────────────────────────────────────┤
│ ┌──────────────────┐  │  │ Topbar (86px)                       │
│ │ Logo              │  │  │ - Título: DASHBOARD                 │
│ │ STYLE Manager    │  │  │ - Data: TERÇA, 31 MARÇO 2026       │
│ │ v1.0.0 - API     │  │  │ - Badge: AO VIVO                   │
│ └──────────────────┘  │  │ - Botões: Atualizar | + Novo        │
│ ┌──────────────────┐  │  └─────────────────────────────────────┤
│ │ NAV               │  │  ┌─────────────────────────────────────┤
│ │ PRINCIPAL        │  │  │ Content (flex)                      │
│ │ > Dashboard       │  │  │                                     │
│ │   Agendamentos    │  │  │ ┌─────────────────────────────────┐│
│ │   Clientes        │  │  │ │ Metrics Row (128px)              ││
│ │   Cabeleireiros   │  │  │ │ [HOJE] [SEMANA] [TX] [PENDENTES] ││
│ │ SISTEMA           │  │  │ └─────────────────────────────────┘│
│ │   Serviços        │  │  │ ┌───────────────┬─────────────────┐│
│ │   Calendário       │  │  │ │ Schedule Panel│ Calendar Panel  ││
│ │   Relatórios       │  │  │ │               │                 ││
│ │   Configurações   │  │  │ │ Lista hoje    │ Calendário       ││
│ └──────────────────┘  │  │ │               │ Alertas          ││
│ ┌──────────────────┐  │  │ └───────────────┴─────────────────┘│
│ │ [Avatar] Admin   │  │  │ ┌────────┬─────────┬────────────┐ ││
│ │ ROOT - ONLINE    │  │  │ │Weekly  │Barber   │ Services   │ ││
│ └──────────────────┘  │  │ │ Chart  │ List    │ Donut+Info │ ││
└────────────────────────┘  └─────────────────────────────────────┘
```

---

## 3. Especificação Visual

### Cores
| Token | Hex | Uso |
|-------|-----|-----|
| `--bg-primary` | `#0d0d0d` | Background principal |
| `--bg-secondary` | `#161616` | Cards, sidebar |
| `--bg-tertiary` | `#1e1e1e` | Inputs, buttons |
| `--border` | `#2a2a2a` | Bordas |
| `--accent` | `#c8a96e` | Destaque (dourado) |
| `--text-primary` | `#f0ede8` | Texto principal |
| `--text-secondary` | `#7a7570` | Texto secundário |
| `--success` | `#5ce0a0` | Sucesso (verde) |
| `--danger` | `#e05c5c` | Erro (vermelho) |

### Tipografia
| Elemento | Fonte | Tamanho | Letter Spacing |
|----------|-------|---------|----------------|
| Logo | Bebas Neue | 28px | 2px |
| Page Title | Bebas Neue | 32px | 2px |
| Section Header | DM Mono | 11px | 2px |
| Body | DM Sans | 12-14px | - |
| Metric Value | DM Sans | 12px | - |

### Dimensões
- **Sidebar**: 220px largura, 1024px altura
- **Topbar**: 86px altura
- **Metrics Row**: 128px altura, gap 16px
- **Panel Card**: borda 1px `#2a2a2a`, corner radius 0

---

## 4. Componentes Reutilizáveis

### 4.1 MetricCard
**Props:**
```typescript
interface MetricCardProps {
  label: string;
  value: string;
  subtext: string;
  indicatorColor: string; // '#5ce0a0' | '#c8a96e' | '#e05c5c'
}
```

**Estrutura:**
- Rectangle (2px, top, cor do indicator)
- Text: Label (uppercase) + Value + Subtext

### 4.2 Panel
**Props:**
```typescript
interface PanelProps {
  title: string;
  action?: string; // texto opcional "ver todos ->"
  children: ReactNode;
}
```

**Estrutura:**
- Frame bg `#161616`, stroke 1px `#2a2a2a`
- Header: border-bottom 1px, title + action

### 4.3 Button
**Props:**
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: ReactNode;
}
```
- Primary: bg `#c8a96e`, text `#0d0d0d`
- Secondary: bg `#1e1e1e`, border `#2a2a2a`, text `#f0ede8`

### 4.4 Badge
**Props:**
```typescript
interface BadgeProps {
  text: string;
  variant?: 'default' | 'success';
}
```

### 4.5 Calendar (opicional)
- Renderiza calendário do mês atual
- Destaque para dia atual

---

## 5. Estrutura de Arquivos

```
src/
├── components/
│   ├── MetricCard.tsx
│   ├── Panel.tsx
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── Sidebar/
│   │   ├── Sidebar.tsx
│   │   ├── SidebarLogo.tsx
│   │   ├── SidebarNav.tsx
│   │   └── SidebarFooter.tsx
│   ├── Topbar/
│   │   └── Topbar.tsx
│   ├── Dashboard/
│   │   ├── MetricsRow.tsx
│   │   ├── SchedulePanel.tsx
│   │   ├── CalendarPanel.tsx
│   │   ├── WeeklyChart.tsx
│   │   ├── BarberList.tsx
│   │   └── ServicesPanel.tsx
│   └── layout/
│       └── DashboardLayout.tsx
├── pages/
│   └── Dashboard.tsx
├── App.tsx
└── main.tsx
```

---

## 6. Dados Estáticos

### Metrics
```typescript
const metrics = [
  { label: 'HOJE', value: '12', subtext: 'agendamentos   +3', color: '#5ce0a0' },
  { label: 'ESTA SEMANA', value: '58', subtext: 'agendamentos   +8%', color: '#c8a96e' },
  { label: 'TX. CONFIRMAÇÃO', value: '84%', subtext: 'clicaram no email   -2%', color: '#c8a96e' },
  { label: 'PENDENTES', value: '7', subtext: 'aguardedo confirmação', color: '#e05c5c' },
];
```

### Today's Schedule
```typescript
const todaySchedule = [
  { time: '09:00', client: 'Rafael Mendes', barber: 'Carlos S.', status: 'Confirmado' },
  { time: '10:00', client: 'João Oliveira', barber: 'Andre L.', status: 'Confirmado' },
  { time: '11:00', client: 'Bruno Costa', barber: 'Carlos S.', status: 'Pendente' },
  { time: '13:00', client: 'Felipe Souza', barber: 'Marcos P.', status: 'Confirmado' },
  { time: '14:00', client: 'Lucas Ferreira', barber: 'Andre L.', status: 'Cancelado' },
  { time: '15:00', client: 'Diego Alves', barber: 'Carlos S.', status: 'Pendente' },
];
```

### Alerts
```typescript
const alerts = [
  { icon: '!', text: '7 agendamentos aguardando confirmação', time: 'há 15 min' },
  { icon: '+', text: 'Calendário gerado para próximos 7 dias', time: 'hoje, 00:00' },
  { icon: '-', text: '14:00 - Horário liberado (cancelamento)', time: 'há 42 min' },
];
```

### Barbers
```typescript
const barbers = [
  { name: 'Carlos Santos', count: 5, services: 'Corte Barba Pigmentação' },
  { name: 'Andre Lima', count: 4, services: 'Corte Degradê' },
  { name: 'Marcos Pinto', count: 3, services: 'Corte Barba Sobrancelha' },
];
```

### Services
```typescript
const services = {
  total: 58,
  breakdown: [
    { name: 'Corte', percent: 48 },
    { name: 'Barba', percent: 32 },
    { name: 'Combo', percent: 20 },
  ],
  metrics: {
    avgAdvance: '18.4h',
    noShowRate: '6.2%',
    newClients: 11,
    remainingSlots: 14,
  },
};
```

---

## 7. Funcionalidades

- [ ] Layout responsivo (min-width: 1024px)
- [ ] Sidebar fixa à esquerda
- [ ] Cards de métricas com cores de indicador
- [ ] Lista de agendamentos com status
- [ ] Calendário mensal estático
- [ ] Gráfico de barras semanal (7 dias)
- [ ] Lista de cabeeleireiros
- [ ] Donut chart de serviços + métricas rápidas
- [ ] Badge "AO VIVO" na topbar
- [ ] Navegação highlight no item ativo

---

## 8. Dependências já configuradas

- React 19
- TypeScript
- TailwindCSS 4
- React Router DOM
- TanStack Query
- ESLint