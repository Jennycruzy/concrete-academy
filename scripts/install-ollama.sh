#!/bin/bash
# Concrete Academy — Ollama Installation Script
# Run on Ubuntu 22.04 VPS as root or with sudo

set -e

echo "=== Installing Ollama ==="
curl -fsSL https://ollama.ai/install.sh | sh

echo ""
echo "=== Enabling Ollama systemd service ==="
systemctl enable ollama
systemctl start ollama

echo ""
echo "=== Waiting for Ollama to start ==="
sleep 3

echo ""
echo "=== Pulling Mistral model (~4GB) ==="
echo "This will take several minutes depending on your connection speed."
ollama pull mistral

echo ""
echo "=== Verifying Ollama is running ==="
curl -s http://localhost:11434/api/tags | python3 -m json.tool || true

echo ""
echo "=== Ollama installation complete ==="
echo "Model: mistral"
echo "Endpoint: http://localhost:11434"
echo ""
echo "To use a lighter model on limited RAM (2GB+ saves):"
echo "  ollama pull phi3"
echo "  Then set OLLAMA_MODEL=phi3 in .env.local"
