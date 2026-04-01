# Stage 1: Build Stage
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Remove the 'todolist' file dependency safely using Node.js
RUN node -e "const fs = require('fs'); const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8')); if (pkg.dependencies) delete pkg.dependencies.todolist; fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));"

# Install dependencies
RUN npm install

# Copy source code
COPY . . 

# Build the application
# We use a build argument for the API URL so it can be configured
ARG VITE_API_URL=http://localhost:5005/api
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Stage 2: Production Stage
FROM nginx:alpine

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom nginx config if needed, but the default is usually fine
# for a SPA if we add a simple try_files directive.
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
