# File: ./Dockerfile
FROM node:12.22.1-alpine3.11

# Copy the package.json and package.lock.json file to the image
WORKDIR /app

# Install git
RUN apk add --update \
  git \
&& rm -rf /var/cache/apk/*

COPY . .

# Run `npm install` to install the dependencies in the 
# package.json fil. 
RUN npm install