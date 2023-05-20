FROM alpine:latest
RUN apk update
RUN apk add bash
RUN apk add curl
WORKDIR /app
RUN curl -L https://github.com/ropfoo/clobbopus/releases/download/Latest/install.sh -o install.sh && bash install.sh
COPY ./apps/clobbopus/clobbopus.yml .
CMD ./clobbopus_data; ./clobbopus_server