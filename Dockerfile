# Stage 1: Build static React assets
FROM node:20-alpine AS build
WORKDIR /app

# Copy dependency definitions
COPY package.json package-lock.json* bun.lock* ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Build production assets (also triggers copy themes)
RUN npm run build

# Stage 2: Serve using high-performance Nginx Alpine
FROM nginx:alpine

# Copy custom Nginx configuration for single-page application routing support
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from Stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 3000 to match AI Studio infrastructure & environment rules
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
