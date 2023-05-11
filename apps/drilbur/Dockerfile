FROM golang:alpine

WORKDIR /app

RUN apk add curl
RUN apk update

RUN go install github.com/cosmtrek/air@latest

COPY ./apps/drilbur .

RUN go mod download

# live reload
# RUN air init

CMD ["air"]
