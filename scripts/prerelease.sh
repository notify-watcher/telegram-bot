#!/bin/bash

 test $GH_RELEASE_GITHUB_API_TOKEN || (echo 'missing GH_RELEASE_GITHUB_API_TOKEN' && exit 1)
