FROM node:18-alpine

ENV PORT 3005

# Create app directory
RUN mkdir -p /usr/src/ralts
WORKDIR /usr/src/ralts

# Installing dependencies
COPY package*.json /usr/src/ralts/
RUN npm install

# Copying source files
COPY . /usr/src/ralts

# Building app
RUN npm run build
EXPOSE 3005

# Running the app
CMD npm start