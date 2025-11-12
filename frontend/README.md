# TODO List - Sistema de Gerenciamento de Tarefas

## Descrição
Sistema de gerenciamento de tarefas com sincronização multiplataforma.

## Tecnologias
- React 18.3.1
- TypeScript 5.6.3
- Vite 5.4.11
- TailwindCSS 3.4.14
- React Router DOM 6.26.2
- TanStack Query 5.59.20
- Zustand 5.0.1
- React Hook Form 7.53.1
- Zod 3.23.8

## Instalação

```bash
npm install
```

## Configuração

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Configure as variáveis de ambiente no arquivo `.env`:
```
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linter

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── App.tsx            # Componente raiz
│   └── router.tsx         # Configuração de rotas
├── assets/                # Recursos estáticos
│   └── styles/           # Estilos globais
├── core/                  # Componentes e lógica compartilhada
│   ├── components/       # Componentes genéricos
│   ├── lib/              # Configurações de bibliotecas
│   ├── utils/            # Funções utilitárias
│   ├── types/            # Tipos globais
│   └── constants/        # Constantes globais
├── domain/               # Domínios de negócio
└── pages/                # Páginas da aplicação
    └── layouts/          # Layouts compartilhados
```

## Arquitetura

O projeto segue uma arquitetura baseada em domínios funcionais:

- **app/**: Configuração central da aplicação (routing, providers)
- **core/**: Componentes e lógica verdadeiramente globais e reutilizáveis
- **domain/**: Módulos de negócio encapsulados com seus próprios componentes, hooks, services e stores
- **pages/**: Componentes de página que orquestram domínios e core

## API Integration

O projeto está configurado para integrar com a API REST backend:

- **Public endpoints**: `/api/v1/external/*` (sem autenticação)
- **Authenticated endpoints**: `/api/v1/internal/*` (requer token)

Os clientes HTTP estão configurados em `src/core/lib/api.ts`.

## Desenvolvimento

1. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

2. Acesse http://localhost:5173

## Build para Produção

```bash
npm run build
```

Os arquivos compilados estarão na pasta `dist/`.

## Licença

Private