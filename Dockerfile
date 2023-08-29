# Stage 1: Build the React app
FROM node:18-alpine

# Set the environment of node 
ENV NODE_ENV='development'


# Set a working directory
WORKDIR /app

# Clear node cache
RUN npm cache clean --force

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Update npm version
RUN npm install -g npm@9.8.1

# Install dependencies
RUN npm ci

# Copy the rest of the app's source code
COPY . .


# Set directory ownership and permissions
USER root

# Change ownership of the app directory
RUN chown -R node:node /app

# Allow write access to the specific directories
RUN chmod -R 777 /app/public /app/.next

USER node

EXPOSE 3000

# Start the application
CMD [ "npx", "turbo", "serve" ]
# CMD npx turbo serve