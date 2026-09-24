# Agroshop

This repository contains the full Agroshop application in one project:

- Frontend: Next.js storefront and admin UI
- Backend: NestJS API

## Project structure

- `agro-shop-sh-client/` — frontend application
- `agro-shop-sh-api/` — backend API

## Local development

Install dependencies at the root (for the frontend scripts) and in the API folder if needed:

```bash
npm install
npm --prefix agro-shop-sh-api install
```

Start both apps together:

```bash
npm run dev
```

This runs:

- Frontend on http://localhost:3000
- API on http://localhost:3002

You can also run them individually:

```bash
npm run dev:client
npm run dev:api
```

## Build

```bash
npm run build
```

## Environment

The frontend already includes the API base URL in `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3002/api/v1
```

The API should have its own `.env` file with the database and app configuration.
