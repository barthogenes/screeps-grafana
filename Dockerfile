# syntax=docker/dockerfile:1
FROM node:latest

# Copy the files necessary to run the data collector script.
WORKDIR /code
COPY ./src/main.js ./src/main.js
COPY package.json package.json
COPY .env .env

# Install dependencies. Skips installing dev-dependencies to keep the image size small.
RUN npm i --production

# Start collecting and sending data to graphite.
CMD ["npm", "run", "start"]