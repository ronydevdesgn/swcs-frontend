# SWCS — Frontend

> **Sistema Web para Controlo de Sumário Universitário**  
> Interface web moderna para gestão académica de sumários, presenças, efetividades e utilizadores, construída com React, Vite e TypeScript.

---

## 🚀 Stack Tecnológica

| Tecnologia | Função |
|---|---|
| **React 18** | Biblioteca de interfaces de utilizador |
| **TypeScript** | Tipagem estática |
| **Vite 6** | Bundler e servidor de desenvolvimento ultra-rápido |
| **React Router 6** | Gestão de rotas com suporte a rotas protegidas |
| **TanStack React Query 5** | Gestão de estado do servidor, cache e re-fetching |
| **Axios** | Cliente HTTP para comunicação com a API |
| **Context API** | Estado global de autenticação (`AuthContext`) |
| **React Toastify** | Notificações e feedback ao utilizador |
| **jsPDF + autotable** | Geração e exportação de relatórios em PDF |
| **React Feather** | Biblioteca de ícones SVG |
| **ESLint + Prettier** | Qualidade e formatação de código |

---

## 📂 Estrutura do Projeto

```
swcs-frontend/
├── src/
│   ├── App.tsx              # Configuração do router e rotas da aplicação
│   ├── main.tsx             # Ponto de entrada (React, QueryClient, ErrorBoundary)
│   ├── global.css           # Estilos globais
│   ├── assets/              # Imagens e recursos estáticos
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Layout.tsx        # Layout principal (Sidebar + Header + conteúdo)
│   │   ├── PrivateRoute.tsx  # Guarda de rotas autenticadas
│   │   ├── SplashScreen.tsx  # Ecrã de carregamento inicial
│   │   ├── Card/             # Componente Card genérico
│   │   ├── Dialog/           # Dialogs de criação/edição (Curso, Professor, Sumário, Efetividade)
│   │   ├── ErrorBoundary/    # Captura global de erros em runtime
│   │   ├── Form/             # Formulários de autenticação (Login, SignUp, ForgotPassword)
│   │   ├── Header/           # Barra de navegação superior
│   │   ├── InputSearch/      # Componente de pesquisa reutilizável
│   │   ├── Shared/           # Estados partilhados (LoadingSkeleton, EmptyState, ErrorState)
│   │   ├── Sidebar/          # Menu de navegação lateral
│   │   └── Table/            # Tabela genérica com suporte a colunas e dados
│   ├── contexts/
│   │   ├── AuthContext.tsx       # Contexto de autenticação global
│   │   └── PageTitleContext.tsx  # Contexto para título dinâmico das páginas
│   ├── hooks/               # Hooks customizados por recurso
│   │   ├── useAuthentication.ts
│   │   ├── useCursos.ts
│   │   ├── useEfetividades.ts
│   │   ├── useFuncionarios.ts
│   │   ├── usePresencas.ts
│   │   ├── useProfessores.ts
│   │   ├── useSumarios.ts
│   │   ├── useDashboardStatus.ts
│   │   ├── useRelatoriosData.ts
│   │   └── usePermission.ts
│   ├── lib/
│   │   ├── api.ts           # Instância configurada do Axios (baseURL, interceptores JWT)
│   │   └── react-query.ts   # Configuração do QueryClient
│   ├── pages/               # Páginas da aplicação
│   │   ├── Login/           # Ecrã de login
│   │   ├── SignUp/          # Ecrã de registo
│   │   ├── ForgotPassword/  # Recuperação de senha
│   │   ├── Dashboard/       # Painel principal com estatísticas
│   │   ├── Cursos/          # Gestão de cursos
│   │   ├── Professores/     # Gestão de professores
│   │   ├── Sumarios/        # Gestão de sumários
│   │   ├── Efetividade/     # Registo de horas trabalhadas
│   │   ├── Relatorios/      # Geração de relatórios PDF
│   │   └── Perfil/          # Perfil do utilizador autenticado
│   ├── types/               # Interfaces e tipos TypeScript
│   │   ├── auth.ts          # Tipos de autenticação (User, LoginResponse, etc.)
│   │   └── entities.ts      # Tipos das entidades (Professor, Curso, Sumario, etc.)
│   └── utils/               # Funções utilitárias
```

---

## 🗺️ Rotas da Aplicação

### Rotas Públicas
| Rota | Página |
|---|---|
| `/login` | Ecrã de login |
| `/signup` | Registo de novo utilizador |
| `/forgotpassword` | Recuperação de senha |

### Rotas Privadas (requerem autenticação)
| Rota | Página |
|---|---|
| `/dashboard` | Painel com estatísticas gerais |
| `/cursos` | Listagem e gestão de cursos |
| `/professores` | Listagem e gestão de professores |
| `/sumarios` | Gestão de sumários académicos |
| `/efetividade` | Registo de efetividade/horas trabalhadas |
| `/relatorios` | Geração e exportação de relatórios |
| `/perfil` | Perfil e dados do utilizador autenticado |

---

## ⚙️ Pré-requisitos

- Node.js >= 18
- npm
- Backend SWCS em execução (ver [swcs-backend](https://github.com/ronydevdesgn/swcs-backend))

---

## 🛠️ Instalação e Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Criar um ficheiro `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3333
VITE_APP_NAME=SWCS
```

---

## ▶️ Executar o Projeto

### Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Build para Produção

```bash
npm run build
npm run preview
```

### Verificação de código (lint)

```bash
npm run lint
```

---

## ✨ Funcionalidades Principais

### 🔐 Autenticação Completa
- Login com email e senha com validação em tempo real
- Registo de novo utilizador com seleção de tipo (Funcionário, Professor, Sumarista)
- Recuperação de senha por email
- Sistema de refresh token para manutenção da sessão
- Proteção de rotas com redirecionamento automático
- Feedback visual com notificações toast

### 📚 Gestão de Sumários
- Criação, edição e listagem de sumários por professor e curso
- Pesquisa e filtragem de registos

### 👨‍🏫 Gestão de Professores e Cursos
- CRUD completo de professores e cursos
- Associação de professores a cursos

### 📊 Dashboard com Estatísticas
- Visão geral do sistema com indicadores chave
- Gráficos de presenças, sumários e efetividade

### 📋 Relatórios
- Geração de relatórios de efetividade (presenças/faltas)
- Exportação em formato PDF via jsPDF

### 🔒 Controlo de Acesso
- Controlo de permissões baseado no tipo de utilizador
- Hook `usePermission` para verificação granular de acesso

---

## 📝 Padrões de Desenvolvimento

- Todo o código usa **TypeScript** com tipos definidos em `src/types/`
- Toda a comunicação com a API é feita via **hooks customizados** em `src/hooks/`
- Os dados do servidor são geridos pelo **React Query** (caching, refetching automático)
- Os componentes são pequenos, reutilizáveis e separados por responsabilidade
- Seguir as regras do **ESLint** configuradas no projeto

---

## 👥 Equipa

- **Rodivânio Alberto Da Costa** — Desenvolvimento Frontend

---

## 🔗 Repositório do Backend

- [SWCS Backend](https://github.com/ronydevdesgn/swcs-backend)

---

## 📄 Licença

MIT
