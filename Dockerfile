### STAGE 1 ###

# Pull official base image
FROM node:16 AS builder

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package.json ./

# Installs all node packages
RUN yarn install 

# Copies everything over to Docker environment
COPY . ./
RUN yarn build

### STAGE 2 ###
# Pull the official nginx:1.19.0 base image
FROM nginx:1.19.0

# Copy React to the container directory
# Set working directory to nginx resources directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static resources
RUN rm -rf ./*

# Copy static resources from builder stage
COPY --from=builder /app/build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
