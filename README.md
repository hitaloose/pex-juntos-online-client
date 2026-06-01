# Juntos Online Client

Interface web para o projeto "Juntos Online" - uma plataforma de classificados desenvolvida como projeto de faculdade.

## Stack

- **Runtime**: Node.js (Vite dev server)
- **Linguagem**: TypeScript
- **Framework**: React 19
- **Roteamento**: React Router 7
- **UI**: Radix UI Themes
- **HTTP Client**: Axios
- **Validação**: Zod

## Scripts

```bash
npm run dev      # Inicia o servidor de desenvolvimento com HMR
npm run build    # Compila o projeto para produção
npm run preview  # Visualiza o build de produção localmente
npm run lint     # Verifica o código
```

## Releases

- **release-i**: Início do projeto - estrutura básica com autenticação, cadastro de provedores e listagem de anúncios
- **release-ii**: Aprimoramento no gerenciamento de anúncios com estados de loading e uploads de imagem
- **release-iii (atual)**: Documentação do projeto com README e testes automatizados

> As versões anteriores do código estão salvas nas branches `release-i` e `release-ii`.

## Estrutura do Projeto

```
src/
├── containers/     # Wrappers de app e configuração de rotas
├── pages/          # Páginas da aplicação (home, login, signup, dashboard, admin)
├── components/     # Componentes reutilizáveis (CategorySelect, NeighborhoodSelect)
├── services/       # Configuração do Axios com interceptor JWT
├── schemas/        # Schemas de validação Zod
├── types/          # Tipos e interfaces TypeScript
├── utils/          # Utilitários (rotas, categorias, status de anúncios)
├── main.tsx        # Ponto de entrada da aplicação
└── vite-env.d.ts   # Tipos do ambiente Vite
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.exemple`:

```env
VITE_API_URL=http://localhost:3333
```

## Autor

Hitalo Loose (hitaloose@gmail.com)
