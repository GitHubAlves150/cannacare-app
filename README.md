## 📊 PLANO COMPLETO DO FRONTEND (15 ETAPAS)

## Etapa 01: Criar projeto NEXT.JS.


Objetivo:
   O Next.JS é um framwork React que permite criar aplicações wrb com renderização híbrida (SSR, SSG, CSR).
   Ele já vem com roteamento baseado em arquivos, otimização de imagens e muitas outras funcionalidades prontas.


## 📋 LISTA COMPLETA DE BRANCHES
```bash
git checkout -b frontend-etapa-01-configuracao
git checkout -b frontend-etapa-02-layout-base
git checkout -b frontend-etapa-03-autenticacao
git checkout -b frontend-etapa-04-dashboard
git checkout -b frontend-etapa-05-pacientes
git checkout -b frontend-etapa-06-medicos
git checkout -b frontend-etapa-07-documentos
git checkout -b frontend-etapa-08-receitas
git checkout -b frontend-etapa-09-anamnese
git checkout -b frontend-etapa-10-produtos
git checkout -b frontend-etapa-11-estoque
git checkout -b frontend-etapa-12-pedidos
git checkout -b frontend-etapa-13-financeiro
git checkout -b frontend-etapa-14-perfil
git checkout -b frontend-etapa-15-deploy
```
## Com usar:
``` bash
# 1. Certifique-se de estar na branch main
git checkout main

# 2. Puxar as atualizações mais recentes
git pull origin main

# 3. Criar a branch da etapa
git checkout -b frontend-etapa-01-configuracao

# 4. Desenvolver a etapa...

# 5. Finalizar a etapa
git add .
git commit -m "✅ Frontend Etapa 1: Configuração Inicial - COMPLETA!"
git push origin frontend-etapa-01-configuracao
```


| Etapa | Módulo | Descrição | Dias |
| :---: | :--- | :--- | :---: |
| 1 | Configuração Inicial | Projeto Next.js, dependências, estrutura | 1 dia |
| 2 | Layout Base | Componentes de layout, navegação, temas | 1 dia |
| 3 | Autenticação | Login, Registro, Proteção de rotas | 2 dias |
| 4 | Dashboard Admin | Visão geral, cards, gráficos | 2 dias |
| 5 | Gestão de Pacientes | Lista, cadastro, edição, detalhes | 2 dias |
| 6 | Gestão de Médicos | Lista, cadastro, edição | 1 dia |
| 7 | Gestão de Documentos | Upload, listagem, aprovação | 2 dias |
| 8 | Gestão de Receitas | Lista, cadastro, validação | 2 dias |
| 9 | Acolhimento (Anamnese) | Formulários, rastreamentos | 2 dias |
| 10 | Gestão de Produtos | Catálogo, CRUD | 1 dia |
| 11 | Gestão de Estoque | Lotes, movimentações, alertas | 2 dias |
| 12 | Gestão de Pedidos | CRUD, status, rastreio | 2 dias |
| 13 | Gestão Financeira | Anuidades, pagamentos | 2 dias |
| 14 | Perfil e Configurações | Perfil do usuário, configurações | 1 dia |
| 15 | Testes e Deploy | Testes, build, deploy | 2 dias |

🏗️ ARQUITETURA DO FRONTEND

```bash

┌─────────────────────────────────────────────────────────────────────┐
│                    CANNACARE - ARQUITETURA FRONTEND                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                    NEXT.JS 14 (App Router)                  │    │
│  │                                                             │    │
│  │  ┌─────────────────┐  ┌─────────────────────────────────┐   │    │
│  │  │   React         │  │   TypeScript                    │   │    │
│  │  │   Components    │  │   Tipagem forte                 │   │    │
│  │  └─────────────────┘  └─────────────────────────────────┘   │    │
│  │                                                             │    │
│  │  ┌─────────────────┐  ┌─────────────────────────────────┐   │    │
│  │  │   Tailwind CSS  │  │   Shadcn/ui (Componentes)       │   │    │
│  │  │   Estilização   │  │   Design System                 │   │    │
│  │  └─────────────────┘  └─────────────────────────────────┘   │    │
│  │                                                             │    │
│  │  ┌─────────────────┐  ┌─────────────────────────────────┐   │    │
│  │  │   React Hook    │  │   TanStack Query                │   │    │
│  │  │   Form + Zod    │  │   Gerenciamento de estado       │   │    │
│  │  │   Formulários   │  │   Cache e requisições           │   │    │
│  │  └─────────────────┘  └─────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                              │                                      │
│                              ▼                                      │
│                    🔗 Axios (API Client)                            │
│                              │                                      │
│                              ▼                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                    BACKEND (Go API)                         │    │
│  │                                                             │    │
│  │  http://localhost:8080/api/                                 │    │
│  └─────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘

```
## 📁 ESTRUTURA DE PASTAS DETALHADA
```bash
cannacare-frontend/
├── .env.local                     # Variáveis de ambiente
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── components.json                # Configuração do Shadcn/ui
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── layout.tsx         # Layout específico para auth
│   │   │   ├── login/
│   │   │   │   └── page.tsx       # Tela de Login
│   │   │   └── register/
│   │   │       └── page.tsx       # Tela de Registro
│   │   │
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx         # Layout do dashboard (com sidebar)
│   │   │   ├── page.tsx           # Dashboard principal
│   │   │   ├── patients/
│   │   │   │   ├── page.tsx       # Lista de pacientes
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx   # Cadastro de paciente
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx   # Detalhes do paciente
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx # Edição de paciente
│   │   │   │
│   │   │   ├── doctors/
│   │   │   │   ├── page.tsx       # Lista de médicos
│   │   │   │   └── new/
│   │   │   │       └── page.tsx   # Cadastro de médico
│   │   │   │
│   │   │   ├── prescriptions/
│   │   │   │   ├── page.tsx       # Lista de receitas
│   │   │   │   └── new/
│   │   │   │       └── page.tsx   # Cadastro de receita
│   │   │   │
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx       # Lista de pedidos
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx   # Detalhes do pedido
│   │   │   │
│   │   │   ├── stock/
│   │   │   │   ├── page.tsx       # Estoque
│   │   │   │   ├── lots/
│   │   │   │   │   └── page.tsx   # Lotes
│   │   │   │   └── movements/
│   │   │   │       └── page.tsx   # Movimentações
│   │   │   │
│   │   │   ├── financial/
│   │   │   │   ├── page.tsx       # Financeiro
│   │   │   │   ├── subscriptions/
│   │   │   │   │   └── page.tsx   # Anuidades
│   │   │   │   └── payments/
│   │   │   │       └── page.tsx   # Pagamentos
│   │   │   │
│   │   │   ├── anamnesis/
│   │   │   │   ├── page.tsx       # Acolhimento
│   │   │   │   └── new/
│   │   │   │       └── page.tsx   # Nova anamnese
│   │   │   │
│   │   │   └── profile/
│   │   │       └── page.tsx       # Perfil do usuário
│   │   │
│   │   ├── api/                    # API Routes (Next.js backend)
│   │   │   └── auth/
│   │   │       └── [...nextauth]/ # NextAuth.js (opcional)
│   │   │
│   │   └── globals.css             # Estilos globais
│   │
│   ├── components/
│   │   ├── ui/                     # Shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   └── ... (todos os componentes shadcn)
│   │   │
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx         # Menu lateral
│   │   │   ├── Header.tsx          # Cabeçalho
│   │   │   └── Footer.tsx          # Rodapé
│   │   │
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx       # Formulário de login
│   │   │   └── RegisterForm.tsx    # Formulário de registro
│   │   │
│   │   ├── patients/
│   │   │   ├── PatientList.tsx     # Lista de pacientes
│   │   │   ├── PatientForm.tsx     # Formulário de paciente
│   │   │   ├── PatientCard.tsx     # Card do paciente
│   │   │   └── PatientStatusBadge.tsx # Badge de status
│   │   │
│   │   ├── doctors/
│   │   │   ├── DoctorList.tsx
│   │   │   └── DoctorForm.tsx
│   │   │
│   │   ├── prescriptions/
│   │   │   ├── PrescriptionList.tsx
│   │   │   └── PrescriptionForm.tsx
│   │   │
│   │   ├── orders/
│   │   │   ├── OrderList.tsx
│   │   │   └── OrderStatusBadge.tsx
│   │   │
│   │   ├── stock/
│   │   │   ├── StockList.tsx
│   │   │   └── StockAlert.tsx
│   │   │
│   │   ├── financial/
│   │   │   ├── SubscriptionList.tsx
│   │   │   └── PaymentList.tsx
│   │   │
│   │   ├── anamnesis/
│   │   │   ├── AnamneseForm.tsx
│   │   │   └── AnamneseList.tsx
│   │   │
│   │   └── dashboard/
│   │       ├── StatsCards.tsx     # Cards de estatísticas
│   │       ├── ChartPatients.tsx  # Gráfico de pacientes
│   │       ├── ChartOrders.tsx    # Gráfico de pedidos
│   │       └── RecentActivity.tsx # Atividade recente
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts          # Axios client configurado
│   │   │   ├── auth.ts            # Funções de autenticação
│   │   │   ├── patients.ts        # Funções de pacientes
│   │   │   ├── doctors.ts         # Funções de médicos
│   │   │   ├── prescriptions.ts   # Funções de receitas
│   │   │   ├── orders.ts          # Funções de pedidos
│   │   │   ├── stock.ts           # Funções de estoque
│   │   │   ├── financial.ts       # Funções financeiras
│   │   │   └── dashboard.ts       # Funções de dashboard
│   │   │
│   │   ├── auth/
│   │   │   ├── AuthContext.tsx    # Contexto de autenticação
│   │   │   ├── AuthProvider.tsx   # Provider do contexto
│   │   │   └── useAuth.ts         # Hook de autenticação
│   │   │
│   │   ├── hooks/
│   │   │   ├── usePatients.ts     # Hook para pacientes
│   │   │   ├── useDoctors.ts      # Hook para médicos
│   │   │   ├── useOrders.ts       # Hook para pedidos
│   │   │   └── useToast.ts        # Hook para toast
│   │   │
│   │   ├── utils/
│   │   │   ├── formatDate.ts      # Formatação de datas
│   │   │   ├── formatCurrency.ts  # Formatação de moeda
│   │   │   ├── validators.ts      # Validações
│   │   │   └── constants.ts       # Constantes da aplicação
│   │   │
│   │   └── types/
│   │       ├── user.ts            # Tipos de usuário
│   │       ├── patient.ts         # Tipos de paciente
│   │       ├── doctor.ts          # Tipos de médico
│   │       ├── prescription.ts    # Tipos de receita
│   │       ├── order.ts           # Tipos de pedido
│   │       ├── stock.ts           # Tipos de estoque
│   │       ├── financial.ts       # Tipos financeiros
│   │       └── api.ts             # Tipos de resposta da API
│   │
│   └── styles/
│       └── globals.css
│
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   └── favicon.ico
│   └── fonts/
│
└── docs/                          # Documentação
    ├── README.md
    ├── API.md                     # Documentação da API
    └── DEPLOY.md                  # Instruções de deploy
```

## 🛠️ Tecnologias Utilizadas e Responsabilidades

### 1. Core Framework
* **Next.js 14 (App Router)**: Framework base utilizando Server Components para renderização eficiente e Client Components para interatividade.
* **React & TypeScript**: Criação de interfaces baseadas em componentes e tipagem estática rigorosa para evitar erros em tempo de execução.

### 2. Estilização & UI (Design System)
* **Tailwind CSS**: Estilização base utilitária focada em performance de CSS e responsividade nativa.
* **Shadcn/ui**: Biblioteca de componentes agnóstica de estilo, acessível (Radix UI) e totalmente customizável para manter a consistência visual do Dashboard.

### 3. Gerenciamento de Dados & Formulários
* **TanStack Query (React Query)**: Responsável pela sincronização de estado com o servidor, cache inteligente de dados, invalidação de consultas e estados de loading/error assíncronos.
* **React Hook Form**: Manipulação otimizada de formulários sem re-renderizações desnecessárias.
* **Zod**: Esquemas de validação de dados em tempo de execução, integrados diretamente ao React Hook Form.

### 4. Comunicação com a API
* **Axios**: Cliente HTTP para centralização de interceptors (injeção automatizada do Token JWT e tratamento global de erros como `401 Unauthorized` e `403 Forbidden`).
* **Base URL de Desenvolvimento**: `http://localhost:8080/api/`

## 📝 PASSO 1: CRIAR O PROJETO NEXT.JS:

 Criar o projeto com TypeScript e Tailwind CSS
 O comando abaixo cria uma nova pasta 'cannacare-frontend'
 com todas as configurações necessárias  

``` npx create-next-app@latest cannacare-frontend --typescript --tailwind --app```

 Explicação das flags:   
```  --typescript  → Usa TypeScript (tipagem forte, melhor para manutenção) ```   
```  --tailwind    → Usa Tailwind CSS (estilização rápida e moderna)    ```   
```  --app         → Usa o App Router (novo sistema de roteamento do Next.js 14) ```    

## O que aconteceu?  

O comando criou a seguinte estrutura:

``` bash
cannacare-frontend/
├── .gitignore           # Arquivos que não vão para o Git
├── package.json         # Dependências do projeto
├── package-lock.json    # Versões exatas das dependências
├── tsconfig.json        # Configuração do TypeScript
├── tailwind.config.ts   # Configuração do Tailwind CSS
├── postcss.config.js    # Configuração do PostCSS (processa CSS)
├── next.config.js       # Configuração do Next.js
├── next-env.d.ts        # Tipos do Next.js para TypeScript
├── public/              # Arquivos públicos (imagens, fonts)
│   ├── next.svg
│   └── vercel.svg
└── src/
    └── app/             # Páginas da aplicação (App Router)
        ├── favicon.ico
        ├── globals.css          # Estilos globais
        ├── layout.tsx           # Layout principal
        └── page.tsx             # Página inicial

``` 

## 📝 PASSO 2: ENTRAR NA PASTA E INSTALAR DEPENDÊNCIAS

Entrar na pasta do projeto
- cd cannacare-frontend

## Instalar as dependências essenciais que vamos usar
- npm install axios @tanstack/react-query react-hook-form @hookform/resolvers zod
- npm install date-fns class-variance-authority clsx tailwind-merge lucide-react
- npm install @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-dropdown-menu

## Explicação de cada dependência:

| Pacote | Para que serve? |
| :--- | :--- |
| `axios` | Cliente HTTP para fazer requisições à API (GET, POST, PUT, DELETE) |
| `@tanstack/react-query` | Gerenciamento de estado assíncrono (cache, loading, erros) |
| `react-hook-form` | Gerenciamento de formulários com validação |
| `@hookform/resolvers` | Integração do react-hook-form com Zod |
| `zod` | Validação de dados com esquemas (schema validation) |
| `date-fns` | Manipulação de datas (formatar, calcular diferenças) |
| `class-variance-authority` | Criar variantes de componentes (ex: button primary, secondary) |
| `clsx` | Concatenar classes CSS condicionalmente |
| `tailwind-merge` | Mesclar classes Tailwind sem conflitos |
| `lucide-react` | Ícones para React |
| `@radix-ui/react-*` | Componentes acessíveis (base do shadcn/ui) |

## 📝 PASSO 3: CONFIGURAR O SHADCN/UI

O que é schadcn/ui?
    Shadcn/ui é uma coleção de componentes React reutilizáveis e acessíveis, construídos com Radix UI e estilizados com Tailwind CSS. Ele permite criar interfaces bonitas rapidamente.     

```bash

# Inicializar o Shadcn/ui
npx shadcn-ui@latest init

# Durante a inicialização, ele vai perguntar algumas coisas:
# 1. Style: default (estilo padrão)
# 2. Base color: slate (cor base)
# 3. CSS variables: Yes (usar variáveis CSS para temas)
# 4. src/ directory: Yes (usar src/ como pasta de componentes)

# Adicionar os componentes base (vamos usar em toda a aplicação)
npx shadcn add button
npx shadcn add card
npx shadcn add input
npx shadcn add label
npx shadcn add table
npx shadcn add form
npx shadcn add dialog
npx shadcn add select
npx shadcn add toast
npx shadcn add dropdown-menu
npx shadcn add avatar
npx shadcn add badge

```
## O que aconteceu?
O Shadcn criou a pasta src/components/ui/ com todos os componentes adicionados.
```bash

src/components/ui/
├── button.tsx          # Botão com variantes
├── card.tsx            # Cards para conteúdo
├── input.tsx           # Campo de entrada
├── label.tsx           # Rótulo para inputs
├── table.tsx           # Tabela
├── form.tsx            # Formulário com validação
├── dialog.tsx          # Modal/diálogo
├── select.tsx          # Dropdown/select
├── toast.tsx           # Notificações
├── dropdown-menu.tsx   # Menu dropdown
├── avatar.tsx          # Avatar do usuário
├── badge.tsx           # Badge/etiqueta
└── index.ts            # Exporta todos os componentes

``` 
## 📝 PASSO 4: CONFIGURAR AS VARIÁVEIS DE AMBIENTE

O que são variáveis de ambiente?
 São valores que podem mudar entre ambientes (desenvolvimento, produção). Não devem ser commitadas no Git.

```bash
# Criar o arquivo .env.local na raiz do projeto
# Este arquivo NUNCA será commitado (já está no .gitignore)
touch .env.local
```

## 🚀 RODAR O PROJETO

Limpar cache (se necessário)
- rm -rf .next

Instalar dependências (se necessário)
- npm install

Rodar o projeto
- npm run dev