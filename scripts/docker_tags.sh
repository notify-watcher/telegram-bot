#!/bin/bash

tags() {
  local image_name="notifywatcher1/telegram-bot"
  local git_describe=$(git describe)
  local git_tag=$(git describe --abbrev=0)

  if [[ "$git_describe" != "$git_tag" ]]; then
    # this is not a new version, update only latest
    echo "${image_name}:latest"
    return
  fi

  # new version, update multiple labels
  git_tag=${git_tag/v/}

  local mayor_minor_path=(${git_tag//./ })
  local mayor="${mayor_minor_path[0]}"
  local minor="${mayor}.${mayor_minor_path[1]}"
  local patch="${minor}.${mayor_minor_path[2]}"

  echo "${image_name}:${patch} ${image_name}:${minor} ${image_name}:${mayor} ${image_name}:latest"
}

echo $(tags)
