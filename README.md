# Agent Orchestrator Dashboard

A dashboard for managing AI agents, built with TanStack Start, TanStack DB, and Electric.

## Prerequisites

- Node.js 18+
- pnpm
- Docker (for Postgres and Electric)

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Start Postgres and Electric
docker compose up -d

# 3. Create environment file
cp .env.example .env

# 4. Run database migration
psql postgresql://postgres:password@localhost:5432/electric -f drizzle/0001_agents.sql

# 5. Start the app
pnpm dev
```

Open http://localhost:5173

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | Postgres connection string | `postgresql://postgres:password@localhost:5432/electric` |
| `ELECTRIC_URL` | Electric sync service URL | `http://localhost:30000` |
| `ELECTRIC_SOURCE_ID` | Electric Cloud source ID | _(optional)_ |
| `ELECTRIC_SECRET` | Electric Cloud secret | _(optional)_ |

## Stack

- **TanStack Start** - Full-stack React framework
- **TanStack DB** - Reactive client-side data with live queries
- **Electric** - Real-time Postgres sync
- **Radix UI** - Accessible component library
- **Drizzle ORM** - TypeScript SQL toolkit

## Project Structure

```
src/
├── components/        # UI components (AgentCard, StatusBadge, etc.)
├── db/
│   ├── collections/   # TanStack DB collections
│   ├── connection.ts  # Drizzle database connection
│   ├── schema.ts      # Zod schemas
│   └── tables.ts      # Drizzle table definitions
├── hooks/             # React hooks
├── lib/               # Utilities (Electric proxy)
└── routes/
    ├── api/           # API routes (Electric proxy, mutations)
    ├── __root.tsx     # Root layout
    └── index.tsx      # Dashboard page
```

## License

MIT
