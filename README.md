## 📊 PLANO COMPLETO DO FRONTEND (15 ETAPAS)

## Etapa De documentação: Esta etapa está reservada para documentação inicial. 

Objetivo:
   O Objetivo desta branch é documentar configurações iniciais do projeto frontend. Confira a baixo a estrutura de pastas e organização de branchs no decorrer deste projeto.

## 📋 LISTA COMPLETA DE BRANCHES

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
