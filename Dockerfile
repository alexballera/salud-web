FROM public.ecr.aws/t1q3d8f8/node-14-buster:latest

EXPOSE 3000

# Copy the package.json and package.lock.json file to the image
WORKDIR /app

COPY . .

# Run `npm install` to install the dependencies in the
# package.json fil.
RUN npm install
RUN npx next build

CMD ["npx", "next", "start"]
