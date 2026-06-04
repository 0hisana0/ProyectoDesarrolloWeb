FROM node:20-alpine

RUN apk add --no-cache python3 make g++ && \
    npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --prod --no-frozen-lockfile && \
    pnpm rebuild bcrypt && \
    apk del python3 make g++

COPY . .

EXPOSE 3001

CMD ["node", "10-autentificacion.js"]
