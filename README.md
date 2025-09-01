# SWCS - Sistema Web de Controle de Sumários

## 📋 Sobre o Projeto

O SWCS (Sistema Web de Controle de Sumários) é uma aplicação web desenvolvida para facilitar a gestão e controle de sumários acadêmicos. O sistema permite a interação eficiente entre professores e sumaristas, automatizando o processo de registro e acompanhamento de sumários.

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Adiciona tipagem estática ao JavaScript
- **Vite** - Ferramenta de build e desenvolvimento
- **React Router 6** - Gerenciamento de rotas
- **React Query** - Gerenciamento de estado e cache de dados
- **Context API** - Gerenciamento de estado global de autenticação
- **React Toastify** - Notificações e feedback ao usuário
- **Axios** - Cliente HTTP para comunicação com a API
- **ESLint** - Configuração avançada para verificação de código

## 📦 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🚀 Como Executar

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

3. Configure o ambiente:
   - Crie um arquivo .env baseado no .env.example
   - Configure a URL da API e outras variáveis necessárias
4. Execute o projeto:

```bash
npm run dev
```

## 📂 Estrutura do Projeto

```
src/
  ├── app.tsx
  ├── main.tsx
  ├── global.css
  ├── vite-env.d.ts
  ├── assets/
  │   └── img/
  │       └── Illustrator.svg
  ├── components/
  │   ├── Layout.css
  │   ├── Layout.tsx
  │   ├── PrivateRoute.tsx
  │   ├── SplashScreen.css
  │   ├── SplashScreen.tsx
  │   ├── ErrorBoundary/
  │   │   └── ErrorBoundary.tsx
  │   ├── Shared/
  │   │   ├── States.tsx
  │   │   └── States.css
  │   ├── Card/
  │   │   ├── Card.css
  │   │   └── Card.tsx
  │   ├── Dialog/
  │   │   ├── Dialog.tsx
  │   │   ├── DialogGlobal.css
  │   │   └── Dialogs/
  │   │       ├── CursoDialog.tsx
  │   │       ├── Efetividade.tsx
  │   │       ├── ProfessorDialog.tsx
  │   │       └── SumarioDialog.tsx
  │   ├── Form/
  │   │   ├── formForgot.css
  │   │   └── formForgot.tsx
  │   │   └── formLogin.css
  │   │   └── formLogin.tsx
  │   │   └── formSignup.css
  │   │   └── formSignup.tsx
  │   ├── Header/
  │   │   ├── Header.css
  │   │   └── Header.tsx
  │   ├── InputSearch/
  │   │   ├── InputSearch.css
  │   │   └── InputSearch.tsx
  │   ├── Sidebar/
  │   │   ├── Sidebar.css
  │   │   └── Sidebar.tsx
  │   └── Table/
  │       ├── Table.css
  │       └── Table.tsx
  ├── contexts/
  │   ├── AuthContext.tsx
  │   └── PageTitleContext.tsx
  ├── hooks/
  │   ├── useAuthentication.ts
  │   ├── useCursos.ts
  │   ├── useEfetividades.ts
  │   ├── useFuncionarios.ts
  │   ├── usePresencas.ts
  │   ├── useProfessores.ts
  │   └── useSumarios.ts
  ├── lib/
  │   ├── api.ts
  │   └── react-query.ts
  ├── pages/
  │   ├── Cursos/
  │   │   ├── index.css
  │   │   └── index.tsx
  │   ├── Dashboard/
  │   │   ├── index.css
  │   │   └── index.tsx
  │   ├── Definicoes/
  │   │   ├── index.css
  │   │   └── index.tsx
  │   ├── Efetividade/
  │   │   ├── index.css
  │   │   └── index.tsx
  │   ├── ForgotPassword/
  │   │   ├── index.css
  │   │   └── index.tsx
  │   ├── Login/
  │   │   ├── index.css
  │   │   └── index.tsx
  │   ├── Perfil/
  │   │   ├── index.css
  │   │   └── index.tsx
  │   ├── Professores/
  │   │   ├── index.css
  │   │   └── index.tsx
  │   ├── Relatorios/
  │   │   ├── index.css
  │   │   └── index.tsx
  │   ├── SignUp/
  │   │   ├── index.css
  │   │   └── index.tsx
  │   └── Sumarios/
  │       ├── index.css
  │       └── index.tsx
  └── types/
      ├── auth.ts
      ├── svg.d.ts
      └── entities.ts
```

## 🔧 Scripts Disponíveis

- npm run dev - Inicia o servidor de desenvolvimento
- npm run build - Gera a versão de produção
- npm run lint - Executa a verificação de código
- npm run preview - Visualiza a versão de produção localmente

## �️ Mudanças recentes implementadas

As alterações abaixo foram adicionadas ao código durante o desenvolvimento local e já estão presentes no repositório:

- `ErrorBoundary` global em `src/components/ErrorBoundary/ErrorBoundary.tsx` e registrado em `src/main.tsx` para capturar erros inesperados em runtime.
- Componentes compartilhados de estado em `src/components/Shared/States.tsx` (`LoadingSkeleton`, `EmptyState`, `ErrorState`) e estilos em `src/components/Shared/States.css` — usados pela `Table` e outros componentes.
- Centralização de tipos em `src/types/entities.ts` (tipos para Sumário, Professor e Curso) e atualização dos Dialogs (`src/components/Dialog/Dialogs/*`) e páginas (`src/pages/*`) para usar essas tipagens.
- `Table` atualizado (`src/components/Table/Table.tsx`) para usar os estados compartilhados e aceitar tanto a API genérica (`columns + data`) quanto o formato simples (`columns + rows`), com renderização segura de células.
- Ajustes nos componentes de diálogo (`Dialog`) e nas páginas (`Sumarios`, `Professores`, `Cursos`) para integrar os novos tipos e flows de criação de entidades.
- Arquivos de configuração base para qualidade de código: `.eslintrc.json` e `.prettierrc` foram adicionados.

## ✅ Como validar localmente (rápido)

1. Instale dependências (se ainda não instalou):

```bash
npm install
```

2. Instale as ferramentas de dev para lint/format (opcional, recomendado):

```bash
npm install --save-dev eslint prettier husky lint-staged @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-config-prettier
```

3. Rodar ESLint (modo recomendado):

```bash
npx eslint --ext .ts,.tsx src --fix
```

4. Iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

5. (Opcional) Ativar Husky e lint-staged para pré-commit:

```bash
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
# e adicionar a configuração `lint-staged` em package.json conforme instruções no README
```

## �📱 Funcionalidades Principais

- Sistema de Autenticação Completo
  - Login com email e senha com validação em tempo real
  - Diferentes níveis de acesso (Sumarista/Professor)
  - Recuperação de senha com confirmação por email
  - Sistema de refresh token para manter a sessão
  - Redirecionamento inteligente baseado no estado de autenticação
  - Feedback visual com toasts para todas as operações
  - Proteção de rotas baseada em autenticação
  - Validação robusta de formulários
- Gestão de Sumários
  - Criação e edição de sumários
  - Visualização de histórico
  - Aprovação/rejeição de sumários
- Gestão de Usuários
  - Cadastro de professores
  - Cadastro de sumaristas
  - Gerenciamento de permissões
  - Controlo de presenças e faltas de professores
- Relatórios
  - Geração de relatórios de efetividade (presenças e faltas dos professores)
  - Estatísticas de sumários (x)
  - Exportação de dados

## 📝 Padrões de Código

- Utilize TypeScript para todo código novo
- Siga as regras do ESLint configuradas
- Mantenha os componentes pequenos e reutilizáveis
- Documente funções e componentes complexos

## 🔒 Variáveis de Ambiente

```
VITE_API_URL=http://localhost:3333
VITE_APP_NAME=SWCS
```

## 👥 Equipe

- [Rodivânio_Alberto_Da_Costa] - Desenvolvedor Frontend

## 📞 Suporte

Para reportar bugs ou sugerir melhorias, abra uma issue no repositório do projeto.

## API

Este projeto utiliza um backend desenvolvido como uma API RESTful para gerenciar os dados e funcionalidades do sistema. Certifique-se de configurar corretamente a URL da API nas variáveis de ambiente para garantir o funcionamento adequado.

### Repositório do Backend

- [SWCS-Backend](https://github.com/ronydevdesgn/swcs-backend)
