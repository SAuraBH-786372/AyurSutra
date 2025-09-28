#!/bin/bash
set -e  # Exit on error

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building application..."
npm run build

# Ensure the out directory exists
mkdir -p out

# Export the static files
echo "Exporting static files..."
npm run export

echo "Build completed successfully!"
