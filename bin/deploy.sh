#!/bin/bash

DEST="~/webapps/static_scottboyle";
HOST="monospaced";

rsync --delete --exclude={.well-known,google26897385c23df8ed.html} --recursive --rsh=ssh ./build/$1 $HOST:$DEST && echo "Deployed to $HOST:$DEST/$1"
