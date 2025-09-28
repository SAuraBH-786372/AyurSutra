#!/bin/bash
set -e  # Exit on error

echo "=== Starting build process ==="

# Install dependencies
echo "Installing dependencies..."
npm install

# Run the build:static script which includes both build and export
echo "Building and exporting static files..."
npm run build:static

# List the contents of the out directory (for debugging)
echo "Contents of out directory:"
ls -la out/

echo "=== Build completed successfully! ==="
