# HEITS Apuseni Cup API

## Description

This is the ASSH API powered by [Nest](https://docs.nestjs.com/) framework.

## Prerequisites

- Docker
- [Nest CLI](https://docs.nestjs.com/cli/overview)
- [TypeORM CLI](https://typeorm.io/using-cli#installing-cli)

## DB Setup

```bash
# copy the example env file
$ cp .env.example .env

# start the API and MySQL together
$ docker compose up --build
```

## App setup

Create a `.env` file by copy-pasting `.env.example` and filling in the config values.

Then:

```bash
# install deps
$ npm install

# run the migrations
$ npm run migration:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

The API listens on `PORT` and uses these database variables:

```bash
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migrations

```shell
# generate migrations based on entities inside the project
npm run typeorm migration:generate -- ./src/data/migrations/<migration_name> -d ./src/config/db.config.ts

# run migrations against the local TypeScript sources
npm run migration:run

# revert a migrations
npm run migration:revert

# run migrations against the compiled build
npm run migration:run:prod
```

## References

- [NestJS](https://docs.nestjs.com/)
- [TypeORM](https://typeorm.io/)
