
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


## Etapa 5: CRUD de médicos(Completo)

Objetivo desta etapa:
 xxxxxxxxx

## 📁 ESTRUTURA DE PASTAS DA ETAPA 6

``` bash
 cannacare-frontend/
├── app/
│   └── dashboard/
│       └── prescriptions/              # 🆕 Página de receitas
│           └── page.tsx                # Lista de receitas
│
├── components/
│   └── forms/
│       └── PrescriptionForm.tsx        # 🆕 Formulário de receita
│
├── lib/
│   └── api/
│       └── prescriptions.ts            # 🆕 Serviço de receitas
│
└── ... (restante da estrutura)

``` 
## ✅ O QUE ESTA PÁGINA FAZ

### 📜 Funcionalidades do Módulo de Receitas

| Funcionalidade | Descrição |
| :--- | :--- |
| **📋 Lista receitas** | Mostra todas as receitas médicas cadastradas no sistema |
| **🔍 Status visual** | Exibe marcadores coloridos diferenciando receitas como: Válida, Próxima a vencer ou Vencida |
| **✅ Validar receita** | Executa a verificação lógica das datas e regras para confirmar se a receita está válida |

### 📐 Arquitetura do Componente Sidebar
```bash

components/layout/Sidebar.tsx
├── importações (Link, usePathname, LogOut)
├── interface SidebarProps
├── ✅ const menuItems (com Receitas incluído)
├── export function Sidebar({ open }: SidebarProps)
│   ├── return (
│   │   ├── <aside> (sidebar)
│   │   │   ├── Logo (CannaCare)
│   │   │   ├── <nav> (menuItems.map)
│   │   │   └── Logout
│   │   └── )
│   └── )
└── }
```

Resultado:
