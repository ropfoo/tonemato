FROM golang:alpine

WORKDIR /app

RUN apk add curl
RUN apk update

COPY go.mod .
COPY go.sum .

COPY ./pkg ./pkg
COPY ./apps/ralts ./apps/ralts 

RUN go mod download

# live reload
COPY ./apps/ralts/.docker/.air.toml . 
RUN go install github.com/cosmtrek/air@latest
CMD ["air"]
