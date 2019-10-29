#!/bin/bash

image=$(scripts/docker_image.sh)

docker push $image
   
