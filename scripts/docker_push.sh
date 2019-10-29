#!/bin/bash

image=$(scripts/docker_image.sh)
tag=$(scripts/docker_tag.sh)

docker push $image:$tag
docker push $image:latest

