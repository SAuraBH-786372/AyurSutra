#!/bin/bash
set -e  # Exit on error

echo "=== Starting build process ==="

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application (next.config.js has output: 'export' which will create the out directory)
echo "Building application..."
npm run build

# Verify the out directory was created
if [ ! -d "out" ]; then
  echo "Error: out directory was not created during build"
  exit 1
fi

# List the contents of the out directory (for debugging)
echo "Contents of out directory:"
ls -la out/

echo "=== Build completed successfully! ==="
