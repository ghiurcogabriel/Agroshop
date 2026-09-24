FROM node:20-bookworm-slim AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

RUN npm ci --no-fund

COPY src ./src

RUN npm run build
RUN npm prune --omit=dev

FROM node:20-bookworm-slim AS runner

WORKDIR /usr/src/app

RUN apt-get update && \
  apt-get install -y --no-install-recommends dumb-init && \
  rm -rf /var/lib/apt/lists/*

ENV NODE_ENV production
ENV PORT 3002

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

USER node

EXPOSE 3002

CMD ["dumb-init", "npm", "run", "start:prod:docker"]
