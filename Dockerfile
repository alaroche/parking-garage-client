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

# "stage 2" (keep removed?)
# Copy static resources from builder stage (TODO: needed?)
# COPY --from=builder /app/build .