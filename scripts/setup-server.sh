#!/bin/bash
# Concrete Academy — Server Setup Script
# Run on fresh Ubuntu 22.04 VPS

set -e

echo "=== Updating system ==="
apt update && apt upgrade -y

echo "=== Installing Node.js 20.x ==="
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

echo "=== Installing PostgreSQL ==="
apt install -y postgresql postgresql-contrib

echo "=== Installing Nginx ==="
apt install -y nginx

echo "=== Installing Certbot ==="
apt install -y certbot python3-certbot-nginx

echo "=== Installing PM2 globally ==="
npm install -g pm2

echo "=== Starting services ==="
systemctl enable postgresql
systemctl start postgresql
systemctl enable nginx
systemctl start nginx

echo ""
echo "=== Server setup complete ==="
echo ""
echo "Next steps:"
echo "  1. Run: bash scripts/install-ollama.sh"
echo "  2. Configure PostgreSQL: bash scripts/setup-postgres.sh"
echo "  3. Deploy the app: bash scripts/deploy.sh"
