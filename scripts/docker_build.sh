#!/bin/bash

image=$(scripts/docker_image.sh)
tag=$(scripts/docker_tag.sh)

  # -t $image:latest \
DOCKER_BUILDKIT=1 docker build \
  -t $image:$tag \
  --progress=auto \
  --secret id=npmrc,src=$HOME/.npmrc \
  .
