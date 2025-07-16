#!/bin/bash

# MiniShop - Guide de démarrage manuel SIMPLIFIÉ
echo "🛍️  MiniShop - Démarrage Manuel Simplifié"
echo "=========================================="

echo ""
echo "📋 INSTRUCTIONS ÉTAPE PAR ÉTAPE :"
echo ""

echo "1️⃣  DÉMARRER MYSQL :"
echo "   ./docker-mysql.sh"
echo ""

echo "2️⃣  ATTENDRE 20 SECONDES puis initialiser la base :"
echo "   cd backend"
echo "   node scripts/init-db.js"
echo "   node scripts/create-test-user.js"
echo "   cd .."
echo ""

echo "3️⃣  DÉMARRER LE BACKEND (nouveau terminal) :"
echo "   cd backend && npm run dev"
echo ""

echo "4️⃣  DÉMARRER LE FRONTEND (nouveau terminal) :"
echo "   cd frontend/minishop-app && npm start"
echo ""

echo "✅ ACCÈS :"
echo "   🌐 Frontend: http://localhost:4200"
echo "   📡 Backend: http://localhost:3000/api"
echo "   👤 Login: demo@minishop.com / demo123"
echo ""

echo "❌ ARRÊTER :"
echo "   Ctrl+C dans chaque terminal, puis ./stop.sh"
echo ""

echo "🚀 Commencer ? Tapez 'yes' pour démarrer MySQL automatiquement :"
read -r response

if [[ "$response" == "yes" ]]; then
    echo "🐳 Démarrage de MySQL..."
    ./docker-mysql.sh
    echo ""
    echo "⏰ Attendez 20 secondes, puis continuez avec les étapes 2-4 ci-dessus"
fi
