#!/bin/bash

if [[ $1 == "" ]]
then
    echo "Usage:    drilbur [COMMAND]"
    echo ""
    echo "Commands:"
    echo "----------"
    echo "install   install dev environment (eg. air)"
    echo "dev       run in dev mode"
fi

if [[ $1 == "install" ]]
then
    echo "installing air for live reloading"
    curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s
fi

if [[ $1 == "dev" ]]
then
    echo "running drilbur in dev ⛏"
    ./bin/air
fi

if [[ $1 == "test" ]]
then
    echo "running drilbur tests ⛏"
    go test ./...
fi

