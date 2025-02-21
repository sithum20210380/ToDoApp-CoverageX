# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies
COPY src/TodoApp.Web/package*.json ./
RUN npm install

# Copy source and build
COPY src/TodoApp.Web/ .
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY docker/web/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]