# AGENTS.md - Instruções para Agentes

## ⚠️ REGRA CRÍTICA
**NÃO crie/inicie servidores!** Há um servidor Vite rodando em `http://localhost:5173`

## Fluxo de Trabalho Padrão

1. **Análise de Design** → Verificar arquivo Pencil (`pencil-managerSchedule.pen`)
2. **Especificação** → Consultar `spec/SPEC-*.md`
3. **Contexto Local** → Verificar `AGENTS.md` em pastas específicas
4. **Implementação** → Seguir padrões documentados
5. **Verificação** → Testar em `http://localhost:5173` via browser

## Estrutura de Pastas

Cada pasta com componentes pode conter seu próprio `AGENTS.md` com:
- Contexto específico do componente
- Padrões de implementação
- Dependências
- Instruções de teste

## URLs de Desenvolvimento

- **Dashboard**: http://localhost:5173/dashboard
- **Outros**: Verificar `src/App.tsx` para rotas

## Padrões de Implementação

### Componentes React
- **Functional components** com TypeScript
- **Props interface**: Sempre definir interface para tipagem
- **Sem useState/useContext**: Componentes são presentacionais
- **Hardcoded data**: Usar dados estáticos até integração com API

### Estilo & Design
- **TailwindCSS 4**: Utilitários para layout, spacing, borders
- **Inline styles**: Usar para fonts (`fontFamily`), gradients (`background: conic-gradient`), cores customizadas
- **Cores da spec**: Sempre usar hex (#0d0d0d, #161616, #c8a96e, etc)
- **Fonts**: Bebas Neue (títulos), DM Mono (labels), DM Sans (corpo)
- **Sem corner radius**: Todos os cards têm `cornerRadius: 0`

### Componentes Reutilizáveis
Criar em `src/components/` quando usado em múltiplos lugares:
- `Badge.tsx` - Badges com status (ex: "AO VIVO")
- `Button.tsx` - Buttons primary/secondary
- `Panel.tsx` - Cards com header e border
- `MetricCard.tsx` - Cards com indicator bar + valores

### Organização de Arquivos
```
src/components/
├── {ComponentName}.tsx       # Componente simples
├── {Feature}/
│   ├── Component1.tsx
│   ├── Component2.tsx
│   └── index.ts              # Re-exports
├── layout/
│   └── DashboardLayout.tsx   # Layout wrapper
├── Sidebar/
│   ├── Sidebar.tsx
│   ├── SidebarLogo.tsx
│   └── SidebarNav.tsx
└── Topbar/
    └── Topbar.tsx
```

### Dados & Mocking
- **Dados estáticos**: Definir `const data = [...]` no componente
- **Sem banco de dados**: Usar dados locais até integração com API
- **Estrutura de dados**: Seguir tipos TypeScript bem definidos

### Cores & Dimensões (Spec SPEC-DASHBOARD.md)
```typescript
// Cores obrigatórias
bg-primary: #0d0d0d        // Background página
bg-secondary: #161616      // Cards, sidebar
bg-tertiary: #1e1e1e       // Inputs
border: #2a2a2a            // Bordas
accent: #c8a96e            // Destaque (ouro)
text-primary: #f0ede8      // Texto
text-secondary: #7a7570    // Texto muted
success: #5ce0a0           // Verde
danger: #e05c5c            // Vermelho

// Dimensões obrigatórias
Sidebar: 220px x 1024px
Topbar: 86px altura
MetricCard: 128px altura, 2px top bar
Panel header: 52px altura, border-bottom
Gap padrão: 16px (gap-4 no Tailwind)
```

### Testing & Verificação
1. Sempre testar em http://localhost:5173/{rota}
2. Verificar contra `spec/SPEC-*.md`
3. Comparar layout com `pencil-managerSchedule.pen`
4. Validar cores, tipografia, espaçamento
5. Usar `VERIFICATION_REPORT.md` como template

## Referências

- **Design System**: `pencil-managerSchedule.pen` (Pencil)
- **Specs**: `spec/` directory
- **Componentes**: `src/components/`
- **Estilos**: TailwindCSS 4 + inline styles (fonts, gradients)

## 📸 Política de Screenshots

**EVITAR screenshots desnecessárias!** Tirar screenshots APENAS quando:
- ✅ Verificação visual crítica vs spec/Pencil
- ✅ Bug/visual issue que precisa ser documentado
- ✅ Aprovação final de feature

**NÃO tirar screenshots para:**
- ❌ Entender código ou estrutura (usar Grep/Read tools)
- ❌ Navegar ou explorar (fazer perguntas em vez disso)
- ❌ Debug de problemas (usar console/network tools)

**Ao tirar screenshots:**
- Usar convenção: `{feature}-{status}-{YYYY-MM-DD}-{HHmm}-v{version}.png`
- Salvar em `screenshots/{feature}/` (NUNCA na raiz!)
- Manter apenas as úteis (remover duplicatas)
- Ver `screenshots/SCREENSHOT_GUIDE.md` para detalhes

⚠️ **CRÍTICO**: 
- **NUNCA** deixar arquivos `.png` ou `.jpg` na raiz do projeto
- Playwright gera `.yml` temporários - remover com `rm -rf .playwright-mcp/`
- Adicionar no `.gitignore`: `/screenshots`, `/current-*.png`, `/dashboard-*.png`, etc
- Verificar `git status` antes de commit - nenhuma imagem pode ir para o repositório

## Lembrete

Sempre manter este arquivo e os `AGENTS.md` locais **atualizados e breves** - apenas o essencial!
