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
pkill -f "nodemon.*server.js" || true
pkill -f "node.*server.js" || true
pkill -f "ng serve" || true
pkill -f "npm run dev" || true
pkill -f "npm start" || true

# Vérifier et arrêter les processus sur les ports
print_info "Vérification des ports..."
if command -v ss &> /dev/null; then
    PID_3000=$(ss -tulpn | grep :3000 | awk '{print $7}' | grep -o '[0-9]*' | head -1)
    PID_4200=$(ss -tulpn | grep :4200 | awk '{print $7}' | grep -o '[0-9]*' | head -1)
    
    if [ ! -z "$PID_3000" ]; then
        print_info "Arrêt du processus sur le port 3000 (PID: $PID_3000)"
        kill -9 $PID_3000 2>/dev/null || true
    fi
    
    if [ ! -z "$PID_4200" ]; then
        print_info "Arrêt du processus sur le port 4200 (PID: $PID_4200)"
        kill -9 $PID_4200 2>/dev/null || true
    fi
fi

# Arrêter le conteneur Docker MySQL
print_info "Arrêt du conteneur MySQL..."
docker stop bdd 2>/dev/null || true
docker rm bdd 2>/dev/null || true

print_status "MiniShop arrêté avec succès !"
