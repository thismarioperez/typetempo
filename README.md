# typetempo

## Setup

This project requires a database. For convenience, a `docker-compose` file is included in this project that quickly setups a database for local development.

From the root of this project run:

`docker compose up -d`

Then, run `pnpm i && pnpm dev` to start up the dev servers for both `api` and `web` projects.

### Apps and Packages

-   `api` backend api `express` server written in Typescript
-   `web` vue3 SPA frontend written in Typescript
-   `@typetempo/db`: shared `prisma` orm library for interacting with database
-   `@typetempo/config-eslint`: shared `eslint` configurations
-   `@typetempo/config-typescript`: `tsconfig.json`s used throughout the monorepo

### Scripts

-   `db:generate`: Regenerate the prisma client
-   `dev`: Startup `api` and `web` dev servers
-   `test:web` Run `web` unit tests
