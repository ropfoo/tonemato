#!/bin/bash

if [[ $1 == "install" ]]
then
    echo "installing air for live reloading"
    curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s
fi

if [[ $1 == "dev" ]]
then
    echo "running ralts in dev"
    ./bin/air
fi

if [[ $1 == "test" ]]
then
    echo "running ralts tests"
    go test ./...
fi

