#!/bin/bash

# MiniShop - Script de démarrage
echo "🛍️  Démarrage de MiniShop..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction d'affichage coloré
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Vérifier si Docker est installé et en cours d'exécution
if ! command -v docker &> /dev/null; then
    print_error "Docker n'est pas installé. Veuillez installer Docker pour continuer."
    exit 1
fi

if ! docker info &> /dev/null; then
    print_error "Docker n'est pas en cours d'exécution. Veuillez démarrer Docker."
    exit 1
fi

# Démarrer MySQL avec la même méthode que start-simple.sh
print_info "Démarrage de la base de données MySQL..."
docker rm -f bdd 2>/dev/null || true

# Utiliser exactement la même commande que docker-mysql.sh qui fonctionne
docker run -d --name bdd -p 3307:3306 \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=minishop \
  mysql:8.0

if [ $? -eq 0 ]; then
    print_status "Base de données MySQL démarrée avec succès"
else
    print_error "Erreur lors du démarrage de MySQL"
    exit 1
fi

# Attendre 20 secondes (délai qui fonctionne dans start-simple.sh)
print_info "Attente de la disponibilité de MySQL (20 secondes)..."
sleep 20

# Créer la base minishop si elle n'existe pas
docker exec bdd mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS minishop;" 2>/dev/null || true
print_status "MySQL est prêt!"

# Installer les dépendances backend si nécessaire
if [ ! -d "backend/node_modules" ]; then
    print_info "Installation des dépendances backend..."
    cd backend && npm install && cd ..
    if [ $? -eq 0 ]; then
        print_status "Dépendances backend installées"
    else
        print_error "Erreur lors de l'installation des dépendances backend"
        exit 1
    fi
fi

# Installer les dépendances frontend si nécessaire
if [ ! -d "frontend/minishop-app/node_modules" ]; then
    print_info "Installation des dépendances frontend..."
    if cd frontend/minishop-app; then
        npm install && cd ../..
        if [ $? -eq 0 ]; then
            print_status "Dépendances frontend installées"
        else
            print_error "Erreur lors de l'installation des dépendances frontend"
            exit 1
        fi
    else
        print_error "Impossible d'accéder au répertoire frontend/minishop-app"
        exit 1
    fi
fi

# Initialiser la base de données
print_info "Initialisation de la base de données..."
if cd backend; then
    # Attendre encore un peu pour être sûr que MySQL est complètement prêt
    sleep 3
    
    # Initialiser les tables et données
    if node scripts/init-db.js; then
        print_status "Tables et données initialisées"
    else
        print_warning "Erreur lors de l'initialisation - continuons quand même"
    fi
    
    # Créer l'utilisateur de test
    if node scripts/create-test-user.js; then
        print_status "Utilisateur de test créé"
    else
        print_warning "Erreur lors de la création de l'utilisateur de test"
    fi
    
    cd ..
else
    print_error "Impossible d'accéder au répertoire backend"
    exit 1
fi

# Démarrer le backend en arrière-plan
print_info "Démarrage du serveur backend..."
if cd backend; then
    npm run dev &
    BACKEND_PID=$!
    cd ..
    print_status "Backend démarré (PID: $BACKEND_PID)"
else
    print_error "Impossible d'accéder au répertoire backend"
    exit 1
fi

# Attendre un peu pour que le backend démarre
sleep 5

# Démarrer le frontend
print_info "Démarrage du serveur frontend..."
if cd frontend/minishop-app; then
    npm start &
    FRONTEND_PID=$!
    cd ../..
    print_status "Frontend démarré (PID: $FRONTEND_PID)"
else
    print_error "Impossible d'accéder au répertoire frontend/minishop-app"
    exit 1
fi

# Messages d'information
echo ""
print_status "🎉 MiniShop démarré avec succès !"
echo ""
print_info "📡 Backend API: http://localhost:3000/api"
print_info "🌐 Frontend: http://localhost:4200"
print_info "🗄️  Base de données: MySQL sur le port 3307"
echo ""
print_warning "Pour arrêter les serveurs, utilisez Ctrl+C ou le script ./stop.sh"
echo ""

# Attendre l'interruption de l'utilisateur
wait
