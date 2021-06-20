#!/bin/bash

# Taken from https://github.com/nanasess/setup-chromedriver/blob/master/lib/setup-chromedriver.sh

set -e

ARCH=$1

if [ "$ARCH" == "linux64" ]; then
    CHROMEAPP=google-chrome
    if ! type -a google-chrome > /dev/null 2>&1; then
        sudo apt-get update
        sudo apt-get install -y google-chrome
    fi
elif [ "$ARCH" == "mac64" ]; then
    CHROMEAPP="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
fi

CHROME_VERSION=$("$CHROMEAPP" --version | cut -f 3 -d ' ' | cut -d '.' -f 1)
VERSION=$(curl --location --fail --retry 10 http://chromedriver.storage.googleapis.com/LATEST_RELEASE_${CHROME_VERSION})

wget -c -nc --retry-connrefused --tries=0 https://chromedriver.storage.googleapis.com/${VERSION}/chromedriver_${ARCH}.zip
unzip -o -q chromedriver_${ARCH}.zip
sudo mv chromedriver /usr/local/bin/chromedriver
rm chromedriver_${ARCH}.zip