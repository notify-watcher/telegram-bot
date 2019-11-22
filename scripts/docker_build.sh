#!/bin/bash

build() {
  local image_tags=""
  for image_tag in $(scripts/docker_tags.sh); do
    image_tags="${image_tags} -t ${image_tag}"
  done

  DOCKER_BUILDKIT=1 docker build \
  --progress=auto \
  --secret id=npmrc,src=$HOME/.npmrc \
  --build-arg GIT_DESCRIBE=$(git describe) \
  $image_tags \
  .
}

build
