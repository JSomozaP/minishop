# MiniShop - Projet E-commerce Full Stack

Un projet de boutique en ligne complète avec backend Node.js/Express et frontend Angular.

## ✅ Status du projet : COMPLET ET FONCTIONNEL

### 🎯 Tests d'intégration validés
- ✅ **Base de données** : MySQL Docker (port 3307)
- ✅ **API Backend** : Node.js/Express (port 3000)
- ✅ **Frontend** : Angular 17 (port 4200)
- ✅ **Intégration** : Communication frontend ↔ backend
- ✅ **Authentification** : Inscription et connexion utilisateur
- ✅ **Catalogue** : Affichage des produits avec images
- ✅ **Navigation** : Routing entre pages (catalogue, détail, login)
- ✅ **CORS** : Configuration Cross-Origin fonctionnelle

## 🚀 Fonctionnalités

### Backend (Node.js/Express)
- ✅ API REST complète
- ✅ Authentification JWT
- ✅ CRUD des produits
- ✅ Base de données MySQL/MariaDB
- ✅ Paiement Stripe Checkout
- ✅ Middleware de sécurité

### Frontend (Angular)
- ✅ Catalogue de produits avec grille responsive
- ✅ Pages détail produit
- ✅ Authentification utilisateur
- ✅ Interface moderne et intuitive
- ✅ Gestion d'état reactive

## 📋 Prérequis

- Node.js (v18+)
- Docker (pour MySQL)
- Compte Stripe (pour les paiements)

## 🛠️ Installation et Démarrage

### 1. Base de données MySQL

```bash
# Supprimer le conteneur existant (si nécessaire)
docker rm -f bdd

# Lancer MySQL/MariaDB
docker run --name bdd -p 3306:3306 -e MARIADB_ROOT_PASSWORD=root -e MARIADB_DATABASE=mini_shop mariadb
```

### 2. Backend

```bash
# Aller dans le dossier backend
cd backend

# Installer les dépendances
npm install

# Configurer les variables d'environnement
# Éditez le fichier .env avec vos clés Stripe

# Initialiser la base de données
npm run init-db

# Démarrer le serveur de développement
npm run dev
```

Le backend sera disponible sur `http://localhost:3001`

### 3. Frontend

```bash
# Aller dans le dossier frontend
cd frontend/minishop-app

# Installer les dépendances
npm install

# Démarrer le serveur de développement
ng serve
```

Le frontend sera disponible sur `http://localhost:4200`

## 📡 API Endpoints

### Routes publiques
- `GET /api/products` - Liste tous les produits
- `GET /api/product/:id` - Détails d'un produit
- `POST /api/login` - Connexion utilisateur
- `POST /api/register` - Inscription utilisateur (bonus)

### Routes protégées (JWT requis)
- `POST /api/product` - Créer un produit
- `PUT /api/product` - Modifier un produit
- `DELETE /api/products/:id` - Supprimer un produit
- `POST /api/checkout` - Créer une session de paiement Stripe

## 🔧 Configuration Stripe

1. Créez un compte sur [Stripe](https://stripe.com)
2. Récupérez vos clés API (test)
3. Mettez à jour le fichier `backend/.env`:

```env
STRIPE_SECRET_KEY=sk_test_votre_cle_secrete
STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle_publique
```

## 👤 Utilisateur de test

Pour tester l'application, vous pouvez créer un compte via la page d'inscription ou utiliser :
- Email: `test@example.com`
- Mot de passe: `password123`

## 🏗️ Structure du projet

```
minishop/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   └── payment.js
│   ├── scripts/
│   │   └── init-db.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    └── minishop-app/
        ├── src/
        │   ├── app/
        │   │   ├── components/
        │   │   ├── models/
        │   │   └── services/
        │   └── styles.css
        ├── angular.json
        └── package.json
```

## 🎨 Fonctionnalités Frontend

- **Catalogue produits** : Grille responsive avec images, prix et stock
- **Détail produit** : Page dédiée avec description complète
- **Authentification** : Connexion/inscription avec JWT
- **Paiement** : Intégration Stripe Checkout
- **Navigation** : Header avec état de connexion
- **Responsive** : Optimisé pour mobile et desktop

## 🔐 Sécurité

- Mots de passe hashés avec bcrypt
- Authentification JWT
- Validation des données
- Protection CORS
- Variables d'environnement pour les secrets

## 🚀 Déploiement

### Backend
- Variables d'environnement de production
- Base de données MySQL/PostgreSQL
- Serveur Node.js (PM2 recommandé)

### Frontend
- Build de production : `ng build --prod`
- Serveur web (Nginx/Apache)
- Configuration des routes SPA

## 📝 Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou faire une pull request.

## 📞 Support

Pour toute question ou problème, ouvrez une issue sur le repository GitHub.
