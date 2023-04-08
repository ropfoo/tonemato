FROM node:18-alpine

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/smeargle
WORKDIR /usr/src/smeargle

# Installing dependencies
COPY package*.json /usr/src/smeargle/
RUN npm install

# Copying source files
COPY . /usr/src/smeargle

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD npm start