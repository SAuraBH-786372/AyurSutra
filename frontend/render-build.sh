#!/bin/bash
# Exit on error
set -o errexit

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building application..."
npm run build

# Create a simple server script
echo 'const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.static(path.join(__dirname, "out")));

// Handle SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "out", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});' > server.js

echo "Server script created successfully!"
