#!/bin/bash

# Script pour démarrer MySQL avec Docker
echo "🐳 Démarrage de MySQL avec Docker..."

# Arrêter le conteneur s'il existe déjà
docker stop bdd 2>/dev/null || true
docker rm bdd 2>/dev/null || true

# Démarrer MySQL avec Docker
docker run -d \
  --name bdd \
  -p 3307:3306 \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=minishop \
  mysql:8.0

echo "⏳ Attente du démarrage de MySQL..."
sleep 15

echo "✅ MySQL est prêt sur le port 3306"
echo "📊 Base de données: mini_shop"
echo "👤 Utilisateur: root (sans mot de passe)"
