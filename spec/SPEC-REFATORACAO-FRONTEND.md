# SPEC: Refatoração Padronizada do Frontend React

**Data**: 02/04/2026  
**Status**: Planejamento  
**Escopo**: Padronização completa do código React

---

## 1. OBJETIVO

Refatorar 100% do frontend React para um padrão único e consistente, eliminando:
- ❌ React.FC (deprecated)
- ❌ Inline styles para layout/spacing/cores (exceto fontFamily e gradients)
- ❌ Interfaces de props faltantes em componentes com side-effects
- ❌ Duplicação de código

**Resultado esperado**: Código mantível, escalável e 100% aderente às regras definidas.

---

## 2. REGRAS OBRIGATÓRIAS

### 2.1 Componentes React

**❌ PROIBIDO:**
```typescript
export const Component: React.FC<Props> = (props) => {
  return <div>...</div>
}

export const Component: React.FunctionComponent<Props> = (props) => {
  return <div>...</div>
}
```

**✅ OBRIGATÓRIO:**
```typescript
interface ComponentProps {
  // apenas se houver side-effects/dados de API
}

export function Component(props: ComponentProps) {
  return <div>...</div>
}
```

**Regra de Interface:**
- Criar interface APENAS se componente recebe props OR tem side-effects (API calls, useState, useEffect)
- Componentes puramente presentacionais SEM side-effects = SEM interface necessária
- Se sem interface, usar: `export function Component() {`

---

### 2.2 Estilização

**❌ PROIBIDO inline:**
```typescript
style={{
  display: 'flex',
  padding: '16px',
  margin: '8px',
  backgroundColor: '#161616',
  border: '1px solid #2a2a2a',
  gap: '16px',
  width: '100%',
  height: '120px'
}}
```

**✅ OBRIGATÓRIO TailwindCSS:**
```typescript
className="flex p-4 m-2 bg-[#161616] border border-[#2a2a2a] gap-4 w-full h-[120px]"
```

**⚠️ EXCEÇÕES (permitido inline):**
```typescript
style={{
  fontFamily: '"DM Sans", sans-serif',  // ✅ OK
  background: 'conic-gradient(...)'      // ✅ OK (gradients complexos)
}}
```

---

### 2.3 Tipagem TypeScript

**❌ PROIBIDO:**
```typescript
const Component = (props: any) => {}
const { data } = props // sem tipagem
```

**✅ OBRIGATÓRIO:**
```typescript
interface ComponentProps {
  data: SomeType
}

export function Component({ data }: ComponentProps) {
  return <div>{data}</div>
}
```

---

## 3. ARQUITETURA DE LAYOUTS

**Objetivo**: Eliminar duplicação de NavBar nas páginas

### 3.1 Estrutura de Layouts (novo)

```
src/layouts/
├── ClientLayout.tsx       // NavBar + conteúdo (Home, Login, Signup)
└── DashboardLayout.tsx    // Sidebar + Topbar + conteúdo (Dashboard)
```

**ClientLayout** (reutilizável em Home, Login, Signup):
- NavBar no topo
- Conteúdo flexible
- Background #0d0d0d

### 3.2 Atualização de App.tsx

Usar Outlet do React Router para aplicar layouts por rota.

---

## 4. COMPONENTES REUTILIZÁVEIS A EXTRAIR

### 4.1 ListItem (novo)
**Extraído de**: SchedulePanel.tsx, BarberList.tsx  
**Propósito**: Padronizar linhas de lista/tabela

### 4.2 SectionHeader (novo)
**Extraído de**: Panel.tsx, SchedulePanel.tsx  
**Propósito**: Header com título + ação (ex: "ver todos ->")

### 4.3 TextBlock (novo)
**Extraído de**: Vários componentes  
**Propósito**: Wrapper de texto com font-family pré-configurada

### 4.4 ChartBar (novo)
**Extraído de**: WeeklyChart.tsx  
**Propósito**: Barra simples para gráficos

### 4.5 StatusBadge (novo)
**Extraído de**: SchedulePanel.tsx  
**Propósito**: Badge de status (Confirmado/Pendente/Cancelado)

### 4.6 NavBar (ajustado)
- Reutilizável em ClientLayout
- Sem props necessárias (component puro)

---

## 5. PLANO DE REFATORAÇÃO

### 5.1 Ordem de Execução (REFATORAR TUDO DE UMA VEZ)

#### FASE 1: Setup de Layouts (15 min)
1. Criar `ClientLayout.tsx` em `src/layouts/`
2. Verificar/atualizar `DashboardLayout.tsx`
3. Atualizar `App.tsx` para usar layouts com Outlet

#### FASE 2: Componentes Reutilizáveis (1h)
4. Criar `ListItem.tsx`
5. Criar `SectionHeader.tsx`
6. Criar `TextBlock.tsx`
7. Criar `ChartBar.tsx`
8. Criar `StatusBadge.tsx`

#### FASE 3: Refatoração de Componentes Legacy (45 min)
9. AuthCard.tsx - React.FC → function, inline → Tailwind
10. AuthButton.tsx - React.FC → function, inline → Tailwind
11. FormInput.tsx - React.FC → function, inline → Tailwind
12. NavBar.tsx - Validar padrão

#### FASE 4: Refatoração de Páginas (1h)
13. Home.tsx - React.FC → function, remover NavBar duplicado
14. Login.tsx - React.FC → function, remover NavBar duplicado
15. Signup.tsx - React.FC → function, remover NavBar duplicado
16. Dashboard.tsx - Validar (já OK)

#### FASE 5: Refatoração de Dashboard Components (1h 30 min)
17. MetricsRow.tsx - Adicionar interface
18. SchedulePanel.tsx - Usar ListItem + SectionHeader
19. CalendarPanel.tsx - Usar SectionHeader
20. WeeklyChart.tsx - Usar ChartBar, adicionar interface
21. BarberList.tsx - Usar ListItem, adicionar interface
22. ServicesPanel.tsx - Adicionar interface

#### FASE 6: Verificação Final (30 min)
23. Remover componentes duplicados (se aplicável)
24. Atualizar `AGENTS.md` com novas regras
25. Verificar build e testes

---

### 5.2 Checklist de Refatoração

| Arquivo | React.FC | Inline Styles | Interface | Prioridade |
|---------|----------|---------------|-----------|-----------|
| AuthCard.tsx | ❌ → ✅ | ❌ → ✅ | ✅ | Alta |
| AuthButton.tsx | ❌ → ✅ | ❌ → ✅ | ✅ | Alta |
| FormInput.tsx | ❌ → ✅ | ❌ → ✅ | ✅ | Alta |
| NavBar.tsx | ❌ → ✅ | ❌ → ✅ | ✅ | Alta |
| Home.tsx | ❌ → ✅ | ❌ → ✅ | - | Alta |
| Login.tsx | ❌ → ✅ | ❌ → ✅ | - | Alta |
| Signup.tsx | ❌ → ✅ | ❌ → ✅ | - | Alta |
| MetricsRow.tsx | ✅ | ✅ | ❌ → ✅ | Média |
| Dashboard.tsx | ✅ | ✅ | - | OK |
| SchedulePanel.tsx | ✅ | ✅ | ✅ | Média |
| CalendarPanel.tsx | ✅ | ✅ | ✅ | Média |
| WeeklyChart.tsx | ✅ | ✅ | ❌ → ✅ | Média |
| BarberList.tsx | ✅ | ✅ | ❌ → ✅ | Média |
| ServicesPanel.tsx | ✅ | ✅ | ✅ | Média |

---

## 6. ESTIMATIVA DE ESFORÇO

| Fase | Tempo |
|------|-------|
| Setup Layouts | 15 min |
| Criar componentes reutilizáveis | 1h |
| Refatorar Auth components | 45 min |
| Refatorar Pages | 1h |
| Refatorar Dashboard components | 1h 30 min |
| Testes + ajustes | 30 min |
| **Total** | **~5h 30min** |

---

## 7. COMPONENTES A CRIAR

```
src/components/
├── ListItem.tsx          (novo)
├── SectionHeader.tsx     (novo)
├── TextBlock.tsx         (novo)
├── ChartBar.tsx          (novo)
└── StatusBadge.tsx       (novo)

src/layouts/
└── ClientLayout.tsx      (novo)
```

---

## 8. ATUALIZAÇÃO AGENTS.md

Adicionar seção clara com:
- ❌ PROIBIDO: React.FC, inline styles para layout
- ✅ OBRIGATÓRIO: Function components, TailwindCSS
- 📋 Exemplos corretos
- 🎯 Benefícios

---

## 9. TESTES MANUAIS

```
Routes a testar:
- GET /              (Home com NavBar)
- GET /login         (Login com NavBar)
- GET /signup        (Signup com NavBar)
- GET /dashboard     (Dashboard com Sidebar+Topbar, sem NavBar)
```

---

## 10. CRITÉRIO DE SUCESSO

- ✅ 0% React.FC no projeto
- ✅ 100% Tailwind para styling (exceto fontFamily/gradients)
- ✅ 100% Function components
- ✅ Interfaces claras quando necessário
- ✅ Layouts reutilizáveis
- ✅ Build sem erros
- ✅ TypeScript sem erros
- ✅ Nenhuma mudança visual
- ✅ Nenhuma mudança de funcionalidade
