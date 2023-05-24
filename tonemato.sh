#!/bin/bash

GOBIN=$(go env GOPATH)/bin

if [[ $1 == "init" ]]
then 
    go install github.com/gzuidhof/tygo@latest
    cd ./apps/drilbur
    source drilbur.sh install
fi

if [[ $1 == "up" ]]
then docker-compose up -d
fi

if [[ $1 == "down" ]]
then docker-compose down
fi

# Drilbur
if [[ $1 == "drilbur" ]]
then
    cd ./apps/drilbur
    if [[ $2 == "install" ]]
    then
        source drilbur.sh install 
    fi
    if [[ $2 == "dev" ]]
    then
        docker compose up -d clobbopus
        source drilbur.sh dev 
    fi
    if [[ $2 == "test" ]]
    then 
        source drilbur.sh test 
    fi
fi

# Ralts
if [[ $1 == "ralts" ]]
then
    cd ./apps/ralts
    if [[ $2 == "install" ]]
    then 
        source ralts.sh install
    fi
    if [[ $2 == "dev" ]]
    then 
        echo "starting redis"
        docker compose up -d redis
        source ralts.sh dev 
    fi
fi

# Smeargle
if [[ $1 == "smeargle" ]]
then
    cd ./apps/smeargle
    if [[ $2 == "install" ]]
    then 
        npm install
    fi
    if [[ $2 == "dev" ]]
    then 
        npm run dev
    fi
fi

# Tygo
if [[ $1 == "tygo" ]]
then
    $GOBIN/tygo generate
    echo "generated ts types"
fi