#!/bin/bash

./wait-for-it.sh $REDIS_HOST:${REDIS_PORT:-6379} \
  && npm run start

