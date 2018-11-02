#!/bin/bash

rm -rf dist/
mkdir -p dist/server

# Copy server assets to dist/
cp -r server/assets dist/server/assets

concurrently "ng build --prod --aot --delete-output-path false --output-hashing none --extract-licenses false" "tsc -p server"

# OLD BUILD AND WATCH COMMANDS
# "xbuild:all:dev": "concurrently \"ng build --no-delete-output-path\" \"tsc -p server\" && cp -r server/assets dist/server/assets",
# "xbuild:all:prod": "rm -rf dist/ && concurrently \"ng build -prod -aot --no-delete-output-path -oh none\" \"tsc -p server\" && cp -r server/assets dist/server/assets",
# "xwatch:all": "cp -r server/assets dist/server/assets && concurrently \"ng serve -pc proxy.config.json -dop false -o\" \"tsc -w -p server\" \"nodemon dist/server/server.js\""
