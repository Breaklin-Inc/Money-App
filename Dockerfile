# Use full Node.js image instead of Alpine to avoid missing dependencies
FROM node:20.9.0 as base
# Install dependencies for canvas node-gyp build
RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    && rm -rf /var/cache/apk/* \

RUN npm install -g pnpm

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY . .
# Install dependencies using pnpm
RUN pnpm install

# Install nodemon globally for watch mode
RUN pnpm run build

FROM alpine:3.19

WORKDIR /usr/src/app

COPY --from=base /usr/src/app/apps/api ./apps/api
COPY --from=base /usr/src/app/apps/api/node_modules ./apps/api/node_modules
COPY --from=base /usr/src/app/node_modules ./node_modules

COPY .env .env
COPY .env ./apps/api/.env


# Expose port
EXPOSE 3002

# Set environment variable
ENV NODE_ENV=development

# Start the application in watch mode
CMD ["node", "./usr/src/apps/api/src/dist/apps/api/src/main"]