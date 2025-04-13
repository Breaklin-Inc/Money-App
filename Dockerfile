# Use full Node.js image instead of Alpine to avoid missing dependencies
FROM node:20.9.0 as base

RUN npm install -g pnpm

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY pnpm-lock.yaml ./
COPY apps/api/package.json package-lock.json ./
# Install dependencies using pnpm
RUN pnpm install --no-frozen-lockfile

# Copy the rest of the application
COPY apps/api .

# Install nodemon globally for watch mode
RUN npm install -g nodemon

# Expose port
EXPOSE 3002

# Set environment variable
ENV NODE_ENV=development

# Start the application in watch mode
CMD ["pnpm", "run", "start:dev"]