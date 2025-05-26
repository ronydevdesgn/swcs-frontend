# SWCS - Sistema Web de Controle de Sumários

## 📋 Sobre o Projeto

O SWCS (Sistema Web de Controle de Sumários) é uma aplicação web desenvolvida para facilitar a gestão e controle de sumários acadêmicos. O sistema permite a interação eficiente entre professores e sumaristas, automatizando o processo de registro e acompanhamento de sumários.

## 🛠️ Tecnologias Utilizadas

- **React** - Biblioteca para construção de interfaces
- **TypeScript** - Adiciona tipagem estática ao JavaScript
- **Vite** - Ferramenta de build e desenvolvimento
- **React Router** - Gerenciamento de rotas
- **Context API** - Gerenciamento de estado global

## 📦 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🚀 Como Executar

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

3. Configure o ambiente:
   
   - Crie um arquivo .env baseado no .env.example
   - Configure a URL da API e outras variáveis necessárias
4. Execute o projeto:
```
npm run dev
```
## 📂 Estrutura do Projeto
```
src/
  ├── assets/        # Arquivos estáticos
  ├── components/    # Componentes 
  reutilizáveis
  │   ├── Header/    # Componente de 
  cabeçalho
  │   └── Sidebar/   # Barra lateral de 
  navegação
  ├── contexts/      # Contextos React 
  (Auth)
  ├── pages/         # Páginas da 
  aplicação
  │   ├── Cursos/
  │   ├── Dashboard/
  │   ├── Efetividade/
  │   ├── Home/
  │   ├── Login/
  │   ├── Professores/
  │   ├── Relatorios/
  │   ├── Sign up/
  │   └── Sumario/
  └── types/         # Definições de 
  tipos TypeScript
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
- Gestão de Sumários
  
  - Criação e edição de sumários
  - Visualização de histórico
  - Aprovação/rejeição de sumários
- Gestão de Usuários
  
  - Cadastro de professores
  - Cadastro de sumaristas
  - Gerenciamento de permissões
- Relatórios
  
  - Geração de relatórios de efetividade
  - Estatísticas de sumários
  - Exportação de dados
## 🤝 Como Contribuir
1. Faça um fork do projeto
2. Crie uma branch para sua feature ( git checkout -b feature/NomeFeature )
3. Faça commit das alterações ( git commit -m 'Adiciona nova feature' )
4. Faça push para a branch ( git push origin feature/NomeFeature )
5. Abra um Pull Request
## 📝 Padrões de Código
- Utilize TypeScript para todo código novo
- Siga as regras do ESLint configuradas
- Mantenha os componentes pequenos e reutilizáveis
- Documente funções e componentes complexos
## 🔒 Variáveis de Ambiente
```
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=SWCS
```
## 👥 Equipe
- [Seu Nome] - Desenvolvedor Frontend
## 📞 Suporte
Para reportar bugs ou sugerir melhorias, abra uma issue no repositório do projeto.