# File: ./Dockerfile
FROM node:lts-buster

EXPOSE 3000

# Copy the package.json and package.lock.json file to the image
WORKDIR /app

COPY . .

# Run `npm install` to install the dependencies in the
# package.json fil.
RUN npm install
RUN npx next build

CMD ["npx", "next", "start"]
