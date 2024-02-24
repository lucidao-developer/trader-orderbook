# Stage 1
FROM node:14-alpine as yarn-install
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN apk update && \
    apk upgrade && \
    apk add --no-cache --virtual build-dependencies bash git openssh python3 make g++ && \
    yarn --frozen-lockfile --no-cache && \
    yarn cache clean

# Runtime container with minimal dependencies
FROM node:14-alpine
WORKDIR /usr/src/app
COPY --from=yarn-install /usr/src/app/node_modules /usr/src/app/node_modules
COPY . .
RUN yarn build

EXPOSE 3000
CMD ["node", "dist/services/api-web/index.js"]