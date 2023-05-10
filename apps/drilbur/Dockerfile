FROM golang:alpine

WORKDIR /app

RUN go install github.com/cosmtrek/air@latest

ADD ./apps/drilbur .

RUN go mod download

# live reload
RUN air init

CMD ["air"]
