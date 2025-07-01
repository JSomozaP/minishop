#!/bin/bash

# MiniShop - Script d'arrêt
echo "🛑 Arrêt de MiniShop..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Arrêter les processus Node.js
print_info "Arrêt des serveurs Node.js..."
pkill -f "node server.js" || true
pkill -f "ng serve" || true
pkill -f "npm run dev" || true
pkill -f "npm start" || true

# Arrêter le conteneur Docker MySQL
print_info "Arrêt du conteneur MySQL..."
docker stop bdd 2>/dev/null || true
docker rm bdd 2>/dev/null || true

print_status "MiniShop arrêté avec succès !"
