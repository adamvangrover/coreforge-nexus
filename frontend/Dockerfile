# Stage 1: Build the React app
FROM node:18-alpine as build
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
# This script should generate a `build` folder (or `dist` depending on configuration)
RUN npm run build

# Stage 2: Serve the static files with Nginx
FROM nginx:1.21.0-alpine

# Copy the build output from the build stage to Nginx's web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx configuration file
# This file should be configured to serve the React app correctly,
# especially handling client-side routing by redirecting all requests to index.html.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (standard HTTP port Nginx listens on)
EXPOSE 80

# Command to start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
