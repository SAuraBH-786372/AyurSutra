#!/bin/bash
set -e  # Exit on error

echo "=== Starting build process ==="

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building application..."
npm run build

# Ensure the out directory exists
echo "Creating output directory..."
mkdir -p out || true

# Export the static files
echo "Exporting static files..."
npx next export -o out

# List the contents of the out directory (for debugging)
echo "Contents of out directory:"
ls -la out/

echo "=== Build completed successfully! ==="
