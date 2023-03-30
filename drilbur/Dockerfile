FROM node:18-alpine

ENV PORT 3001

# Install prerequisites
RUN apk update
RUN apk add curl

# Create app directory
RUN mkdir -p /usr/src/drilbur
WORKDIR /usr/src/drilbur

# Installing dependencies
COPY package*.json /usr/src/drilbur/
RUN npm install

# Copying source files
COPY . /usr/src/drilbur

# Building app
RUN npm run build
EXPOSE 3001

# Running the app
CMD "npm" "run" "start"