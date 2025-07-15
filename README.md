# SWCS - Sistema Web de Controle de Sumários

## 📋 Sobre o Projeto

O SWCS (Sistema Web de Controle de Sumários) é uma aplicação web desenvolvida para facilitar a gestão e controle de sumários acadêmicos. O sistema permite a interação eficiente entre professores e sumaristas, automatizando o processo de registro e acompanhamento de sumários.

## 🛠️ Tecnologias Utilizadas

- **React** - Biblioteca para construção de interfaces
- **TypeScript** - Adiciona tipagem estática ao JavaScript
- **Vite** - Ferramenta de build e desenvolvimento
- **React Router** - Gerenciamento de rotas
- **Context API** - Gerenciamento de estado global
- **ESLint** - Configuração avançada para verificação de código
- **Prettier** - Formatação de código

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
  ├── assets/        # Arquivos estáticos
  │   └── img/       # Imagens do projeto
  ├── components/    # Componentes reutilizáveis
  │   ├── Form/      # Componentes de formulário
  │   ├── Header/    # Componente de cabeçalho
  │   ├── Layout/    # Layout principal da aplicação
  │   ├── PrivateRoute/ # Componente de proteção de rotas
  │   ├── SplashScreen/ # Tela de carregamento
  │   └── Sidebar/   # Barra lateral de navegação
  ├── contexts/      # Contextos React
  │   └── AuthContext.tsx  # Contexto de autenticação
  ├── hooks/         # Hooks personalizados
  │   └── useAuth.ts # Hook de autenticação
  ├── pages/         # Páginas da aplicação
  │   ├── Dashboard/ # Página inicial após login
  │   ├── Cursos/    # Gestão de cursos
  │   ├── Definicoes/ # Configurações do sistema
  │   ├── Efetividade/ # Controle de efetividade
  │   ├── Login/     # Página de login
  │   ├── Perfil/    # Perfil do usuário
  │   ├── Professores/ # Gestão de professores
  │   ├── Relatorios/ # Geração de relatórios
  │   ├── SignUp/    # Página de cadastro
  │   └── Definicoes/ # Configurações do sistema
  └── types/         # Definições de tipos TypeScript
      └── auth.ts    # Tipos relacionados à autenticação
```

## 🔧 Scripts Disponíveis

- npm run dev - Inicia o servidor de desenvolvimento
- npm run build - Gera a versão de produção
- npm run lint - Executa a verificação de código
- npm run preview - Visualiza a versão de produção localmente

## 📱 Funcionalidades Principais

- Autenticação
  - Login com email e senha
  - Diferentes níveis de acesso (Sumarista/Professor)
  - Recuperação de senha
  - Redirecionamento automático para login em rotas inválidas (usuários não autenticados)
  - Redirecionamento automático para dashboard em rotas inválidas (usuários autenticados)
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
