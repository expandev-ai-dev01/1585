# TODO List - Backend API

Sistema de gerenciamento de tarefas - API REST

## Tecnologias

- Node.js
- TypeScript
- Express.js
- SQL Server
- Zod (validação)

## Estrutura do Projeto

```
src/
├── api/              # Controladores de API
├── routes/           # Definições de rotas
├── middleware/       # Middlewares Express
├── services/         # Lógica de negócio
├── utils/            # Funções utilitárias
├── constants/        # Constantes da aplicação
├── instances/        # Instâncias de serviços
├── config/           # Configurações
└── server.ts         # Ponto de entrada
```

## Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Configurar variáveis de ambiente no .env
```

## Desenvolvimento

```bash
# Modo desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start
```

## Configuração do Banco de Dados

1. Configure as variáveis de ambiente no arquivo `.env`
2. Execute os scripts SQL da pasta `database/` (quando criados)
3. Verifique a conexão através do endpoint `/health`

## Endpoints

### Health Check
- `GET /health` - Verifica status da API

### API v1
- Base URL: `/api/v1`
- External (público): `/api/v1/external`
- Internal (autenticado): `/api/v1/internal`

## Estrutura de Resposta

### Sucesso
```json
{
  "success": true,
  "data": {},
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Erro
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Padrões de Código

- TypeScript strict mode
- ESLint para qualidade de código
- Indentação: 2 espaços
- Aspas simples para strings
- Semicolons obrigatórios
- Máximo 120 caracteres por linha

## Licença

ISC