#!/bin/bash
# Exit on error
set -o errexit

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building application..."
npm run build

# Install serve if not already installed
echo "Setting up serve..."
npm install -g serve

# Start the application
echo "Starting application..."
serve -s out -l 10000
