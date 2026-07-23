
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

## PASSO 1: Criar o projeto Next.js  
```bash
# Criar o projeto (mais simples!)
npx create-next-app@latest cannacare-frontend --typescript --tailwind --app --eslint

# Entrar na pasta
cd cannacare-frontend

# Instalar dependências essenciais (sem Shadcn)
npm install axios react-hook-form @hookform/resolvers zod
``` 

## 📝 PASSO 1: ATUALIZAR O LAYOUT PRINCIPAL
- Arquivo: app/layout.tsx
Explicação:

    ✅ children é o conteúdo de cada página

    ✅ A fonte Inter é carregada automaticamente

    ✅ Metadados são injetados no <head> da página

## 📝 PASSO 2: ATUALIZAR OS ESTILOS GLOBAIS
- Arquivo: app/globals.css
## 📝 PASSO 3: CRIAR O COMPONENTE BOTÃO 
- Arquivo: components/ui/Button.tsx

Explicação:

    ✅ Variants: primary (verde), secondary (cinza), outline (borda)

    ✅ Sizes: sm, md, lg

    ✅ Acessibilidade: foco, disabled

    ✅ Reutilizável: pode ser usado em qualquer lugar

## 📝 PASSO 4: CRIAR O COMPONENTE CARD
Arquivo: components/ui/Card.tsx
Explicação:

    ✅ Estrutura: Header, Title, Subtitle, Content, Footer

    ✅ Flexível: Pode ser usado de várias formas

    ✅ Limpo: Código simples e fácil de entender
 
 ## 📝 PASSO 5: CRIAR A PÁGINA DE BOAS-VINDAS  
 Arquivo: app/page.tsx

 Explicação:

    ✅ Layout centralizado: Card no meio da tela

    ✅ Logo: Letra "C" estilizada

    ✅ Título: Nome da aplicação

    ✅ Descrição: Funcionalidades principais

    ✅ Botão: "Entrar no Sistema" (link para login)

    ✅ Link: "Cadastre-se" (link para registro)

## 📝 PASSO 6: VERIFICAR SE TUDO FUNCIONA
Rodar o projeto:
```bash
# Limpar cache (se necessário)
rm -rf .next

# Rodar
npm run dev
```