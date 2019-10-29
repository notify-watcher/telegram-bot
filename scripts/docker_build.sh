#!/bin/bash

image=$(scripts/docker_image.sh)

DOCKER_BUILDKIT=1 docker build \
  -t $image \
  --progress=auto \
  --secret id=npmrc,src=$HOME/.npmrc \
  .
