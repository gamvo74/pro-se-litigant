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

# Run database migrations (retry until the api container is ready)
echo "Running database migrations..."
for i in $(seq 1 5); do
  docker compose -f docker-compose.prod.yml exec -T api npx prisma migrate deploy && break || (echo "Retry $i/5…" && sleep 10)
done

# Prune old images to save space
echo "Pruning old images..."
docker image prune -f

echo "Deployment successful!"
