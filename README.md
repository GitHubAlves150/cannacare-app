
## tecnoloigas que vamos usar.

* **Next.js 14 (App Router):** Framework React com roteamento
* **React:** Interfaces e estado
* **TypeScript:** Tipagem estática
* **Tailwind CSS:** Estilização rápida
* **React Hook Form + Zod:** Formulários e validação
* **Axios:** Chamadas à API

Vantagens Desta Abordagem:

    ✅ Menos dependências (não vamos usar Shadcn)

    ✅ Componentes próprios (total controle)

    ✅ Mais rápido de desenvolver

    ✅ Mais fácil de entender e modificar

    📁 ESTRUTURA SIMPLIFICADA DO FRONTEND  

📁 ESTRUTURA DA ETAPA 1

```bash
cannacare-frontend/
├── app/
│   ├── layout.tsx          # Layout principal (já existe)
│   ├── globals.css         # Estilos globais (já existe)
│   └── page.tsx            # Página inicial (vamos criar!)
├── components/
│   └── ui/                 # Componentes básicos
│       ├── Button.tsx      # 🆕 Botão reutilizável
│       └── Card.tsx        # 🆕 Card reutilizável
└── public/
    └── images/             # Para imagens futuras


``` 
## 🌿 LISTA DE BRANCHES DO FRONTEND
# 🌿 Cronograma de Desenvolvimento Front-end & Mapeamento de Branches

Abaixo encontra-se a estrutura de ramificação do Git mapeada para cada módulo do sistema e os respetivos endpoints consumidos da API em Go.

* **Etapa 1: `frontend-etapa-01-boas-vindas`**
  * **Módulo:** Página Inicial
  * **Endpoints:** Nenhum (página pública de apresentação)

* **Etapa 2: `frontend-etapa-02-login`**
  * **Módulo:** Autenticação
  * **Endpoints:** `POST /api/auth/login`, `POST /api/auth/register`

* **Etapa 3: `frontend-etapa-03-dashboard`**
  * **Módulo:** Dashboard
  * **Endpoints:** `GET /api/dashboard/overview`

* **Etapa 4: `frontend-etapa-04-pacientes`**
  * **Módulo:** Pacientes
  * **Endpoints:** `POST/GET/PUT/DELETE /api/patients`, `PATCH /api/patients/{id}/status`

* **Etapa 5: `frontend-etapa-05-medicos`**
  * **Módulo:** Médicos
  * **Endpoints:** `POST/GET/PUT/DELETE /api/doctors`, `GET /api/doctors/top`

* **Etapa 6: `frontend-etapa-06-documentos`**
  * **Módulo:** Documentos
  * **Endpoints:** `POST/GET /api/patients/{id}/documents`, `PATCH /api/documents/{id}/status`

* **Etapa 7: `frontend-etapa-07-receitas`**
  * **Módulo:** Receitas
  * **Endpoints:** `POST/GET/PUT/DELETE /api/prescriptions`, `GET /api/prescriptions/validate/{id}`

* **Etapa 8: `frontend-etapa-08-anamnese`**
  * **Módulo:** Acolhimento
  * **Endpoints:** `POST/GET/PUT/DELETE /api/patients/{id}/anamnesis`

* **Etapa 9: `frontend-etapa-09-produtos`**
  * **Módulo:** Produtos
  * **Endpoints:** `POST/GET/PUT/DELETE /api/products`, `GET /api/products/low-stock`

* **Etapa 10: `frontend-etapa-10-estoque`**
  * **Módulo:** Estoque
  * **Endpoints:** `POST/GET /api/stock/lots`, `POST /api/stock/adjust`, `GET /api/stock/movements`

* **Etapa 11: `frontend-etapa-11-pedidos`**
  * **Módulo:** Pedidos
  * **Endpoints:** `POST/GET/PATCH /api/orders`, `PATCH /api/orders/{id}/status`, `POST /api/orders/{id}/label`

* **Etapa 12: `frontend-etapa-12-financeiro`**
  * **Módulo:** Financeiro
  * **Endpoints:** `POST/GET /api/financial/subscriptions`, `POST/GET/PATCH /api/financial/payments`

* **Etapa 13: `frontend-etapa-13-relatorios`**
  * **Módulo:** Relatórios
  * **Endpoints:** `GET /api/dashboard/patients`, `GET /api/dashboard/expired-prescriptions`

* **Etapa 14: `frontend-etapa-14-perfil`**
  * **Módulo:** Perfil
  * **Endpoints:** `GET/PUT /api/users/me`

* **Etapa 15: `frontend-etapa-15-deploy`**
  * **Módulo:** Deploy
  * **Endpoints:** N/A (Configurações de ambiente de produção e CI/CD)


## Etapa 4: CRUD de pacientes(Completo)

Objetivo desta etapa:
 xxxxxxxxx

## 📁 ESTRUTURA DE PASTAS DO FRONTEND - ETAPA 2 com tema escuro

``` bash
 cannacare-frontend/
├── app/
│   ├── dashboard/
│   │   ├── layout.tsx              # Layout do dashboard (sidebar + header)
│   │   ├── page.tsx                # Dashboard principal (estatísticas)
│   │   └── patients/               # 🆕 Página de pacientes
│   │       └── page.tsx            # Lista de pacientes (Fila Regulatória)
│   ├── login/
│   │   └── page.tsx                # Login
│   ├── register/
│   │   └── page.tsx                # Registro
│   ├── favicon.ico
│   ├── globals.css                 # Estilos globais
│   ├── layout.tsx                  # Layout principal
│   └── page.tsx                    # Redireciona para login
│
├── components/
│   ├── layout/                     # Componentes de layout
│   │   ├── Sidebar.tsx             # Menu lateral
│   │   └── Header.tsx              # Cabeçalho
│   └── ui/                         # Componentes UI reutilizáveis
│       ├── Button.tsx
│       └── Card.tsx
│
├── lib/
│   ├── api/                        # 🆕 Serviços da API
│   │   ├── client.ts               # Cliente Axios
│   │   ├── auth.ts                 # Autenticação
│   │   ├── dashboard.ts            # Dashboard (estatísticas)
│   │   └── patients.ts             # 🆕 Pacientes (CRUD)
│   └── utils.ts                    # Funções utilitárias
│
├── types/                          # Tipos TypeScript
│   └── index.ts
│
├── .env.local                      # Variáveis de ambiente
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
``` 


Resultado:

## ✅ O QUE ESTA PÁGINA FAZ

### 📋 Funcionalidades do Módulo de Pacientes

| Funcionalidade | Descrição |
| :--- | :--- |
| **📋 Lista pacientes** | Mostra todos os pacientes cadastrados no sistema |
| **🔍 Status visual** | Exibe cores diferentes e intuitivas para cada status do paciente |
| **✅ Aprovar** | Altera o status do paciente diretamente para "Aprovado" |
| **❌ Rejeitar** | Altera o status do paciente diretamente para "Negado" |
| **🔄 Atualização** | Recarrega e sincroniza a lista de dados imediatamente após qualquer ação |


## 📋 RESUMO DOS ARQUIVOS NOVOS/ALTERADOS

### 📂 Estrutura de Ficheiros do Módulo de Pacientes

| Arquivo | Caminho | O que faz |
| :--- | :--- | :--- |
| `patients.ts` | `lib/api/patients.ts` | 🆕 Funções para buscar e atualizar pacientes consumindo a API |
| `page.tsx` | `app/dashboard/patients/page.tsx` | 🆕 Interface da página da fila regulatória com a listagem |


## 🎯 O QUE CADA ARQUIVO FAZ

### 🗂️ Mapeamento de Ficheiros e Funções (Dashboard & Pacientes)

| Arquivo | Função |
| :--- | :--- |
| `app/dashboard/page.tsx` | Dashboard com estatísticas do sistema exibidas em cards |
| `app/dashboard/patients/page.tsx` | Lista de pacientes integrada com ações rápidas de aprovar/rejeitar |
| `lib/api/dashboard.ts` | Comunicação com o backend para buscar as estatísticas gerais |
| `lib/api/patients.ts` | Funções para buscar a lista de pacientes e atualizar o status regulatório |
