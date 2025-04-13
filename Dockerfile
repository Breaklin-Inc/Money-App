# Use full Node.js image instead of Alpine to avoid missing dependencies
FROM node:20.9.0 as base

RUN npm install -g pnpm

# Set working directory
WORKDIR /usr/src/app/apps/api

# Copy package files and install dependencies
COPY ./apps/api /usr/src/app/apps/api
# Install dependencies using pnpm
RUN pnpm install --no-frozen-lockfile

# Install nodemon globally for watch mode
RUN npm install -g nodemon

# Expose port
EXPOSE 3002

# Set environment variable
ENV NODE_ENV=development

# Start the application in watch mode
CMD ["pnpm", "run", "start:dev"]