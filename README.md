# ACME System

## Descrição do Projeto

O **ACME System** é uma aplicação web desenvolvida para gerenciar requisições de compra e cotações de produtos. O sistema é dividido em duas funcionalidades principais, direcionadas para dois tipos de usuários: **Colaboradores** e **Administradores**.

- **Colaboradores** podem criar e listar requisições de compra.
- **Administradores** têm uma visão geral de todas as requisições, podem gerenciar o status das requisições, visualizar cotações para diferentes produtos e empresas, além de cadastrar fornecedores, produtos e colaboradores.

O sistema foi construído com foco em acessibilidade, usando um design intuitivo e amigável, com autenticação baseada em **Firebase Authentication** e persistência de dados no **Firebase Firestore**.

---

## Funcionalidades

### Para Colaboradores:

- **Cadastro de Requisições**: Colaboradores podem cadastrar novas requisições de compra, preenchendo informações sobre o produto, marca, quantidade, entre outros.
- **Listagem de Requisições**: Colaboradores podem listar suas próprias requisições e verificar o status atualizado de cada uma delas.

### Para Administradores:

- **Gerenciamento de Requisições**: Administradores podem visualizar todas as requisições feitas, atualizar seus status (A Esperar, Em Cotação, Cotado), além de excluir requisições.
- **Consulta de Cotações**: Administradores podem selecionar um produto e visualizar as cotações de diferentes fornecedores através de gráficos.
- **Cadastro de Produtos, Fornecedores e Contatos**: Administradores podem cadastrar novos produtos, fornecedores e contatos no sistema.

---

## Tecnologias Utilizadas

### Frontend

- **ReactJS**: Framework JavaScript utilizado para construir a interface de usuário de maneira reativa e modular.
- **Material-UI (MUI)**: Biblioteca de componentes React para implementar rapidamente componentes estilizados e responsivos.
- **React Router DOM**: Para gerenciamento de rotas e navegação entre diferentes páginas da aplicação.
- **Chart.js**: Biblioteca de gráficos usada para visualização de dados, como exibição de cotações de produtos por empresa.

### Backend (Firebase)

- **Firebase Authentication**: Para autenticação de usuários com login e controle de permissões baseado em roles (colaborador e admin).
- **Firebase Firestore**: Banco de dados NoSQL em tempo real, utilizado para armazenar informações sobre colaboradores, requisições, produtos, cotações, entre outros.

### Ferramentas e Conceitos Adicionais

- **React Hooks**: Utilizados para gerenciar o estado e efeitos colaterais no React, como `useState` e `useEffect`.
- **Firebase SDK**: Conjunto de bibliotecas fornecidas pelo Firebase para autenticação, banco de dados e funções utilitárias.
- **Modularização de Componentes**: Cada parte da aplicação foi separada em componentes reutilizáveis e de fácil manutenção.
- **Controle de Roles**: Controle de acesso baseado em funções. Apenas usuários com a role `admin` podem acessar determinadas funcionalidades, como gerenciamento de cotações e requisições.

---

## Estrutura de Pastas

```bash
├── src
│   ├── assets
│   ├── components
│   │   ├── Colaborador
│   │   │   ├── NovaRequisicaoCompra.js
│   │   │   ├── ListarRequisicoes.js
│   │   ├── Admin
│   │   │   ├── CadastroCotacoes.js
│   │   │   ├── ListarRequisicoesAdmin.js
│   │   │   ├── VisualizarCotacoes.js
│   │   ├── Menu.js
│   ├── config
│   │   ├── firebase.js
│   ├── App.js
│   ├── index.js
│   └── README.md
```

### Principais Componentes

- **Menu.js**: Componente de navegação que exibe diferentes opções de menu com base no papel do usuário (Admin ou Colaborador).
- **NovaRequisicaoCompra.js**: Formulário para colaboradores criarem novas requisições de compra.
- **ListarRequisicoes.js**: Exibe todas as requisições feitas por um colaborador, com detalhes e status.
- **ListarRequisicoesAdmin.js**: Lista as requisições para administradores, com opções de alterar o status e excluir.
- **VisualizarCotacoes.js**: Mostra gráficos comparativos das cotações de produtos entre diferentes fornecedores.

---

### Configuração do Projeto

#### Pré-requisitos

- **Node.js** (versão 14.x ou superior)
- **Firebase CLI** (opcional para gerenciamento do Firebase via terminal)

### Configuração do Projeto

#### Pré-requisitos

- **Node.js** (versão 14.x ou superior)
- **Firebase CLI** (opcional para gerenciamento do Firebase via terminal)

#### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/acme-system.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd acme-system
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Configure o Firebase:

   - Crie um projeto no [Firebase](https://firebase.google.com/).
   - Habilite **Firestore** e **Firebase Authentication** no console do Firebase.
   - Obtenha as credenciais de configuração do Firebase e substitua no arquivo `firebase/config.js`.

5. Execute o projeto localmente:

   ```bash
   npm start
   ```

## CI Pipeline

Este projeto também inclui uma pipeline de CI que é executada automaticamente no GitHub Actions sempre que há um push ou pull request para as branches `main`, `master` ou `feature/develop`.

### Arquivo de Configuração da Pipeline

```yaml
name: CI Pipeline

on:
  push:
    branches:
      - main
      - master
      - feature/develop
  pull_request:
    branches:
      - main
      - master
      - feature/develop

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      # Passo 1: Check-out do código
      - name: Check out code
        uses: actions/checkout@v3

      # Passo 2: Configuração do Node.js
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "16"

      # Passo 3: Cache das dependências do node_modules
      - name: Cache node modules
        uses: actions/cache@v3
        with:
          path: node_modules
          key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      # Passo 4: Instalação das dependências do projeto
      - name: Install dependencies
        run: npm install

      # Passo 5: Executa os testes
      - name: Run tests
        run: npm test

      # Passo 6: Gera o build (se aplicável)
      - name: Build project
        run: npm run build
```

O projeto estará rodando em [http://localhost:3000](http://localhost:3000).
