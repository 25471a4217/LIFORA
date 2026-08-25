# LIFORA Backend

A TypeScript Express backend for LIFORA, an intelligent life operating system.

## Features

- JWT authentication with refresh tokens
- Prisma ORM for PostgreSQL
- Redis adapter for caching and rate limiting
- Zod validation schemas
- Modular route architecture
- Planner, XP, analytics, and AI service abstractions
- Docker support with Postgres and Redis

## Quick Start

1. Copy `.env.example` to `.env` and configure database, Redis, and secrets.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```
4. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Seed demo data:
   ```bash
   npm run seed
   ```
6. Start development server:
   ```bash
   npm run dev
   ```

## Docker

Start with:
```bash
docker compose up --build
```

## API

The backend exposes REST endpoints under `/api/v1` for authentication, users, onboarding, goals, tasks, planner, AI, rewards, analytics, and more.

## Testing

Run:
```bash
npm test
```
