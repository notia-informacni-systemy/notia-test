#!/bin/bash

rm -rf dist/
mkdir -p dist/server

# Copy server assets to dist/
cp -r server/assets dist/server/assets

# Initial build
echo "Running initial build"
tsc -p server

echo "Running watch processes"
concurrently "ng serve --proxy-config proxy.config.json -o" "tsc -w -p server" "nodemon dist/server/server.js"
