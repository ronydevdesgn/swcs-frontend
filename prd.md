# PRD — SWCS Frontend

> Versão: 1.0.1 | Última atualização: 2026-03-15

---

## 1) Visão Geral

O SWCS Frontend é a interface web do Sistema Web de Controlo de Sumários. Permite que professores e funcionários façam login, consultem e registem sumários, presenças e efetividades. Comunica exclusivamente com o SWCS Backend (porta `3333`) via API REST.

---

## 2) Tecnologias

| Ferramenta | Detalhe |
|---|---|
| **Framework** | React 18 + TypeScript |
| **Build** | Vite 5 (dev: porta `5173`) |
| **Navegação** | React Router 6 |
| **Server state** | TanStack React Query (`@tanstack/react-query`) |
| **HTTP Client** | Axios via `src/lib/api.ts` (interceptors de auth + refresh) |
| **Autenticação** | Context API (`AuthContext`) + `localStorage` |
| **Notificações** | React Toastify |
| **Estilo** | CSS Modules + `global.css` |

---

## 3) Estrutura

```
src/
├── App.tsx               ← Router (rota raiz "/" = Login)
├── main.tsx              ← Entry point + QueryClient + AuthProvider
├── global.css            ← Reset + variáveis globais
├── lib/
│   └── api.ts            ← Axios instance (base URL: http://localhost:3333)
├── contexts/
│   └── AuthContext.tsx   ← Estado de auth, login/logout, refresh automático
├── hooks/                ← 1 hook por domínio (React Query)
│   ├── useAuthentication.ts
│   ├── useCursos.ts
│   ├── useDashboardStatus.ts
│   ├── useEfetividades.ts
│   ├── useFuncionarios.ts
│   ├── usePermission.ts
│   ├── usePresencas.ts
│   ├── useProfessores.ts
│   ├── useRelatoriosData.ts
│   └── useSumarios.ts
├── types/
│   ├── entities.ts       ← Todos os interfaces de domínio (camelCase)
│   └── auth.ts           ← Auth interfaces + UserRole
├── pages/                ← 1 pasta por página
│   ├── Login/
│   ├── SignUp/
│   ├── ForgotPassword/
│   ├── Dashboard/
│   ├── Professores/
│   ├── Cursos/
│   ├── Sumarios/
│   ├── Efetividade/
│   ├── Relatorios/
│   └── Perfil/
├── components/
│   ├── Layout.tsx / Layout.css
│   ├── PrivateRoute.tsx
│   ├── SplashScreen.tsx / SplashScreen.css
│   ├── Card/
│   ├── Dialog/
│   ├── ErrorBoundary/
│   ├── Form/
│   ├── Header/
│   ├── InputSearch/
│   ├── Shared/
│   ├── Sidebar/
│   └── Table/
└── utils/                ← helpers
```

---

## 4) Convenções (SEMPRE SEGUIR)

- **API calls**: usar exclusivamente `api` de `src/lib/api.ts` (nunca `fetch()` direto)
- **Todos os campos**: camelCase, alinhados com a API (`professorId`, `cargaHoraria`, `horasTrabalhadas`)
- **Server state**: React Query em hooks em `src/hooks/`; sem `useEffect`+`fetch` para dados
- **UI state**: `useState` / `useReducer` local no componente
- **Auth state**: `useAuth()` do `AuthContext`
- **Erros**: `onError` nas mutations do React Query + `toast.error()`
- **Rotas privadas**: sempre envolver em `<PrivateRoute>` no `App.tsx`
- **Idioma**: comentários, mensagens de UI e commits em português

---

## 5) Domínios e Páginas

| Domínio | Hook | Página | Estado |
|---|---|---|---|
| Auth | `useAuthentication.ts` | `Login`, `SignUp`, `ForgotPassword` | ✅ Implementado |
| Dashboard | `useDashboardStatus.ts` | `Dashboard` | ✅ Implementado |
| Professores | `useProfessores.ts` | `Professores` | ✅ Implementado |
| Cursos | `useCursos.ts` | `Cursos` | ✅ Implementado |
| Sumários | `useSumarios.ts` | `Sumarios` | ✅ Implementado |
| Efetividades | `useEfetividades.ts` | `Efetividade` | ✅ Implementado |
| Relatórios | `useRelatoriosData.ts` | `Relatorios` | ✅ Implementado |
| Funcionários | `useFuncionarios.ts` | *(sem página)* | ⚠️ Hook existe, página não |
| Permissões | `usePermission.ts` | *(sem página)* | ⚠️ Hook parcial, painel admin não |
| Perfil | *(inline em AuthContext)* | `Perfil` | ⚠️ Página básica, edição incompleta |

---

## 6) Problemas Conhecidos

### 🔴 Crítico
1. **Interface `User` duplicada** — definida em `src/types/auth.ts` E `src/types/entities.ts`. Consolidar em `auth.ts` e re-exportar de `entities.ts`.

### 🟡 Médio
2. **Sem página dedicada de Funcionários** — hook `useFuncionarios.ts` completo mas não existe `pages/Funcionarios/`.
3. **Página Perfil incompleta** — não permite editar dados nem alterar senha (`PUT /usuarios/:id/senha`).
4. **Validação de formulários manual** — sem Zod/react-hook-form; erros tratados manualmente.
5. **`UserRole` não inclui `SUMARISTA`** — enum Prisma tem 3 valores; frontend só trata `FUNCIONARIO | PROFESSOR`.

### 🟢 Menor
6. **`SplashScreen` mínimo** — apenas texto. Deveria mostrar spinner enquanto o estado de auth resolve.
7. **Sem testes** — nenhum teste unitário ou de integração no frontend.

---

## 7) Métricas de Qualidade Alvo

| Métrica | Alvo |
|---|---|
| Tempo carregamento inicial | < 2s |
| First Input Delay | < 100ms |
| Lighthouse Score | > 90 |
| Cobertura de testes | > 60% |
| Zero erros TypeScript | strict mode |

---

## 8) Padrões de Desenvolvimento

- **TypeScript strict** em todos os ficheiros
- **Conventional Commits** (`feat:`, `fix:`, `chore:`, `docs:`)
- **Git branching**: `main` (prod) → `dev` (integração) → feature branches
- **ESLint + Prettier** para consistência
- **Idioma das explicações**: português

---

## 9) Roadmap

### Fase 1 — Completude Frontend
- [ ] Criar página **Funcionários** (tabela + modal CRUD, mesmo padrão de Professores)
- [ ] Completar página **Perfil** (ver + editar dados + alterar senha)
- [ ] Adicionar painel **Permissões** (atribuir/revogar permissões por utilizador)
- [ ] Adicionar UI de registo de presenças em lote (`POST /presencas/batch`)

### Fase 2 — Qualidade
- [ ] Consolidar tipo `User` (remover duplicação entre `auth.ts` e `entities.ts`)
- [ ] Validação de formulários com Zod + react-hook-form
- [ ] Adicionar Vitest + Testing Library (testes de componentes e hooks)
- [ ] Melhorar `SplashScreen` com spinner animado

### Fase 3 — Produto
- [ ] Exportação PDF/Excel de relatórios (backend já suporta)
- [ ] Filtros por intervalo de datas no Dashboard
- [ ] Lazy loading de páginas (React.lazy + Suspense)
- [ ] Dark mode via CSS variables
