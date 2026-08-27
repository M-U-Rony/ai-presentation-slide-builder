FROM oven/bun:1-alpine
WORKDIR /app

COPY package.json bun.lock ./
COPY prisma ./prisma/
COPY prisma.config.ts ./
RUN bun install --frozen-lockfile


COPY . .
ENV NODE_ENV=production
RUN bunx prisma generate
RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "start"]
