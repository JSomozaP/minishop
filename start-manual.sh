#!/bin/bash

echo "🚀 Démarrage manuel de MiniShop..."

# 1. Arrêter tous les services existants
echo "🛑 Nettoyage des services existants..."
pkill -f "node.*server\|nodemon\|ng serve" 2>/dev/null || true
docker stop bdd 2>/dev/null || true
docker rm bdd 2>/dev/null || true

# 2. Démarrer MySQL
echo "🐳 Démarrage de MySQL..."
docker run -d --name bdd -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=mini_shop \
  mysql:8.0

echo "⏳ Attente de MySQL (30 secondes)..."
sleep 30

# 3. Test de connexion MySQL
echo "🔍 Test de connexion MySQL..."
docker exec bdd mysql -uroot -proot -e "SHOW DATABASES;" 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✅ MySQL est prêt !"
else
    echo "❌ MySQL n'est pas encore prêt, attendons encore..."
    sleep 10
fi

# 4. Démarrer le backend
echo "🔧 Démarrage du backend..."
cd backend
npm run dev &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

# 5. Attendre que le backend soit prêt
echo "⏳ Attente du backend..."
sleep 10

# 6. Tester l'API backend
echo "🔍 Test de l'API backend..."
curl -s http://localhost:3001/api/health | grep -q "Minishop API"
if [ $? -eq 0 ]; then
    echo "✅ Backend est prêt !"
else
    echo "❌ Backend n'est pas encore prêt"
fi

# 7. Démarrer le frontend
echo "🎨 Démarrage du frontend..."
cd ../frontend/minishop-app
ng serve --port 4200 --host 0.0.0.0 &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

echo ""
echo "🎉 MiniShop est en cours de démarrage !"
echo ""
echo "📱 Frontend: http://localhost:4200"
echo "🔧 Backend API: http://localhost:3001/api"
echo "🐳 MySQL: localhost:3306"
echo ""
echo "⚠️  Pour arrêter, utilisez Ctrl+C puis ./stop.sh"
echo ""

# Garder le script en vie
wait
