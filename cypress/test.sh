#!/usr/bin/env bash
set -e # https://stackoverflow.com/a/821419/5504438

# https://www.banjocode.com/post/bash/flags-bash/
VIDEO=false
UPDATE_SNAPSHOT=false
CT=true
E2E=true

while [ "$1" != "" ]; do
    case $1 in
    --video)
        shift
        VIDEO=true
        ;;
    -u | --update)
        shift
        UPDATE_SNAPSHOT=true
        ;;
    --ct)
        shift
        CT=true
        E2E=false
        ;;
    --e2e)
        shift
        CT=false
        E2E=true
        ;;
    esac
done

# CT=$CT_ONLY && ! $E2E_ONLY) || (! $CT_ONLY && ! $E2E_ONLY)
# E2E=$E2E_ONLY && ! $CT_ONLY

PARAMS="--browser chromium --headless --reporter cypress-image-snapshot/reporter --config video=${VIDEO} --env updateSnapshots=${UPDATE_SNAPSHOT}"

if $CT
then
  yarn cypress run-ct $PARAMS
fi

if $E2E
then
  yarn cypress run $PARAMS
fi
