#!/bin/bash
# Static export script for fallback deployment

echo "Building static export..."
mkdir -p dist
cp -r public/* dist/
cp public/index.html dist/404.html

echo "Static export complete. Deploy the 'dist' folder to any static host."
