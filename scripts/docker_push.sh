#!/bin/bash

push() {
  for image_tag in $(scripts/docker_tags.sh); do
    docker push $image_tag
  done
}

push
