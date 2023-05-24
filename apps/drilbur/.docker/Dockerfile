FROM golang:alpine

WORKDIR /app

RUN apk add curl
RUN apk update

COPY go.mod .
COPY go.sum .

COPY ./pkg ./pkg
COPY ./apps/drilbur ./apps/drilbur 

RUN go mod download

# live reload
COPY ./apps/drilbur/.docker/.air.toml . 
RUN go install github.com/cosmtrek/air@latest
CMD ["air"]
