#!/bin/bash

# Deployment Script for VPS

# Stop script on error
set -e

# Load environment variables (optional if passed via CI)
# source .env

# Pull latest images
echo "Pulling latest images..."
docker compose -f docker-compose.prod.yml pull

# Restart containers
echo "Restarting containers..."
docker compose -f docker-compose.prod.yml up -d

# Prune old images to save space
echo "Pruning old images..."
docker image prune -f

echo "Deployment successful!"
