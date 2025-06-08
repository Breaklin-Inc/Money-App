# Use full Node.js image instead of Alpine to avoid missing dependencies
FROM node:20.9.0 as base
ARG NODE_AUTH_TOKEN
ENV NODE_AUTH_TOKEN=$NODE_AUTH_TOKEN

RUN npm install -g pnpm

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY . .
# Provide github secret
RUN echo "//npm.pkg.github.com/:_authToken=$NODE_AUTH_TOKEN" > .npmrc
# Install dependencies using pnpm
RUN pnpm install

# Install nodemon globally for watch mode
RUN pnpm run build

FROM alpine:3.19

RUN apk add nodejs

WORKDIR /usr/src/app

COPY --from=base /usr/src/app/apps/api ./apps/api
COPY --from=base /usr/src/app/apps/api/node_modules ./apps/api/node_modules
COPY --from=base /usr/src/app/node_modules ./node_modules

# Expose port
EXPOSE 3002

# Set environment variable
ENV NODE_ENV=development

RUN ls -alh /usr/src/app/apps/api/dist

# Start the application in watch mode
CMD ["node", "/apps/api/dist/main.js"]
