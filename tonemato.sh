#!/bin/bash

if [[ $1 == "init" ]]
then 
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
    if [[ $2 == "dev" ]]
    docker compose up -d clobbopus
    then source drilbur.sh dev 
    fi
    if [[ $2 == "test" ]]
    then source drilbur.sh test 
    fi
fi

# Ralts
if [[ $1 == "ralts" ]]
then
    if [[ $2 == "dev" ]]
    then 
        echo "starting redis"
        docker compose up -d redis
        npm run dev:ralts
        
    fi
fi

# Smeargle
if [[ $1 == "smeargle" ]]
then
    if [[ $2 == "dev" ]]
      then npm run dev:smeargle
    fi
fi