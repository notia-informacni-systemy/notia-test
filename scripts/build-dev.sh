#!/bin/bash

rm -rf dist/
mkdir -p dist/server

# Copy server assets to dist/
cp -r server/assets dist/server/assets

concurrently "ng build --no-delete-output-path" "tsc -p server"
