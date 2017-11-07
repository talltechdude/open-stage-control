#!/bin/sh

ARGS="-l /data/config.json -n"
if [ "$PORT" ]; then ARGS=$ARGS+" -p $PORT"; fi;

if [ "$OSCHOST" ] && [ "$OSCPORT" ]; then ARGS=$ARGS+" -s $OSCHOST:$OSCPORT"; fi;

node app/ $ARGS
