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

## Referências

- **Design System**: `pencil-managerSchedule.pen` (Pencil)
- **Specs**: `spec/` directory
- **Componentes**: `src/components/`
- **Estilos**: TailwindCSS 4 + inline styles (fonts, gradients)

## Lembrete

Sempre manter este arquivo e os `AGENTS.md` locais **atualizados e breves** - apenas o essencial!
