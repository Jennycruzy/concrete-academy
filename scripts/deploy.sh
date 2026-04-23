#!/bin/bash
# Concrete Academy — Deployment Script
# Run from the project root directory

set -e

echo "=== Concrete Academy Deployment ==="

# Check .env.local exists
if [ ! -f ".env.local" ]; then
  echo "ERROR: .env.local not found. Copy .env.local.example and configure it."
  exit 1
fi

echo "=== Installing dependencies ==="
npm ci --production=false

echo "=== Building Next.js app ==="
npm run build

echo "=== Starting/restarting with PM2 ==="
pm2 describe concrete-academy > /dev/null 2>&1 && \
  pm2 restart concrete-academy || \
  pm2 start npm --name "concrete-academy" -- start

echo "=== Saving PM2 process list ==="
pm2 save

echo "=== Deployment complete ==="
echo ""
pm2 status concrete-academy
echo ""
echo "App running at http://localhost:3000"
echo "Configure Nginx to proxy to this port."
