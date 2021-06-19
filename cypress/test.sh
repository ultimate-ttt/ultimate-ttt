#!/usr/bin/env bash
set -e # https://stackoverflow.com/a/821419/5504438

# https://www.banjocode.com/post/bash/flags-bash/
VIDEO=false
UPDATE_SNAPSHOT=false
CT_ONLY=false
E2E_ONLY=false

while [ "$1" != "" ]; do
    case $1 in
    --video)
        VIDEO=true
        ;;
    -u | --update)
        shift
        UPDATE_SNAPSHOT=true
        ;;
    esac
done

PARAMS="--browser chromium --headless --reporter cypress-image-snapshot/reporter --config video=${VIDEO} --env updateSnapshots=${UPDATE_SNAPSHOT}"

yarn cypress run-ct $PARAMS
yarn cypress run $PARAMS
