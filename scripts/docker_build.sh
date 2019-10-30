#!/bin/bash

image=$(scripts/docker_image.sh)
tag=$(scripts/docker_tag.sh)

DOCKER_BUILDKIT=1 docker build \
  # -t $image:latest \
  -t $image:$tag \
  --progress=auto \
  --secret id=npmrc,src=$HOME/.npmrc \
  .
