#!/usr/bin/env bash
set -e # https://stackoverflow.com/a/821419/5504438

# https://www.banjocode.com/post/bash/flags-bash/
VIDEO=false
UPDATE_SNAPSHOT=false
CT=true
E2E=true
BROWSER="chromium"

while [ "$1" != "" ]; do
    case $1 in
    -v | --video)
        VIDEO=true
        ;;
    -u | --update)
        UPDATE_SNAPSHOT=true
        ;;
    --ct)
        CT=true
        E2E=false
        ;;
    --e2e)
        CT=false
        E2E=true
        ;;
    --browser)
        shift # remove `--browser` from `$1`
        BROWSER=$1
        ;;
    esac
    shift # remove the current value for `$1` and use the next
done

PARAMS="--browser ${BROWSER} 
        --headless 
        --reporter cypress-image-snapshot/reporter 
        --config video=${VIDEO} 
        --env updateSnapshots=${UPDATE_SNAPSHOT}"

# Don't delete video assets so all of them are available after CI run! 
if [ $CI ]; then
  PARAMS="${PARAMS} --config trashAssetsBeforeRuns=false"
fi

if [ $CT ]; then
  yarn cypress run-ct $PARAMS
fi

if [ $E2E ]; then
  yarn cypress run $PARAMS
fi
