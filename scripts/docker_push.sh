#!/bin/bash

image=$(scripts/docker_image.sh)
tag=$(scripts/docker_tag.sh)

# docker push $image:latest
docker push $image:$tag
