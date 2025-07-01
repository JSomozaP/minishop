# ✅ Projet MiniShop

## 🎯 Fonctionnalités Implémentées

### ✅ Backend Node.js/Express
- **API REST complète** avec toutes les routes demandées
- **Authentification JWT** avec middleware de sécurité
- **CRUD des produits** (Create, Read, Update, Delete)
- **Base de données MySQL** avec tables User et Product
- **Paiement Stripe Checkout** pour acheter des produits
- **Chiffrement des mots de passe** avec bcrypt
- **CORS configuré** pour le frontend Angular

### ✅ Frontend Angular
- **Catalogue de produits** en grille responsive
- **Page détail produit** avec toutes les informations
- **Authentification utilisateur** (connexion/inscription)
- **Navigation moderne** avec header et routing
- **Interface utilisateur** belle et moderne
- **Gestion d'état reactive** avec RxJS

### ✅ Routes API Implémentées

#### Routes Publiques
- `GET /api/products` ✅ Récupérer tous les produits
- `GET /api/product/:id` ✅ Récupérer un produit spécifique
- `POST /api/login` ✅ Authentification utilisateur

#### Routes Protégées (JWT)
- `POST /api/product` ✅ Ajouter un nouveau produit
- `PUT /api/product` ✅ Mettre à jour un produit
- `DELETE /api/products/:id` ✅ Supprimer un produit
- `POST /api/checkout` ✅ Générer une URL de paiement Stripe

## 🚀 Comment Démarrer

### Option 1 : Script Automatique
```bash
./start.sh
```

### Option 2 : Manuel

1. **Base de données :**
```bash
docker rm -f bdd
docker run --name bdd -p 3306:3306 -e MARIADB_ROOT_PASSWORD=root -e MARIADB_DATABASE=mini_shop mariadb
```

2. **Backend :**
```bash
cd backend
npm install
npm run dev
```

3. **Frontend :**
```bash
cd frontend/minishop-app
npm install
ng serve
```

## 🌐 URLs d'accès

- **Frontend Angular :** http://localhost:4200
- **Backend API :** http://localhost:3001/api
- **Health Check :** http://localhost:3001/api/health

## 📱 Utilisation

1. **Parcourir le catalogue** : Accédez à http://localhost:4200
2. **Voir un produit** : Cliquez sur un produit pour voir ses détails
3. **Se connecter** : Utilisez le bouton "Se connecter" en haut à droite
4. **Créer un compte** : Basculez vers "S'inscrire" depuis la page de connexion
5. **Acheter** : Une fois connecté, cliquez sur "Acheter maintenant" (nécessite configuration Stripe)

## ⚙️ Configuration Stripe

Pour activer les paiements, éditez `backend/.env` :
```env
STRIPE_SECRET_KEY=sk_test_votre_cle_stripe
STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle_stripe
```

## 📁 Structure du Projet

```
minishop/
├── backend/                    # API Node.js/Express
│   ├── config/database.js     # Configuration MySQL
│   ├── middleware/auth.js     # Middleware JWT
│   ├── routes/                # Routes API
│   │   ├── auth.js           # Authentification
│   │   ├── products.js       # CRUD produits
│   │   └── payment.js        # Stripe Checkout
│   ├── .env                  # Variables d'environnement
│   └── server.js             # Serveur principal
├── frontend/minishop-app/     # Application Angular
│   ├── src/app/
│   │   ├── components/       # Composants UI
│   │   ├── services/         # Services API
│   │   └── models/           # Interfaces TypeScript
│   └── angular.json
├── start.sh                  # Script de démarrage
├── stop.sh                   # Script d'arrêt
└── README.md                 # Documentation
```

## 🔧 Technologies Utilisées

**Backend :**
- Node.js + Express.js
- MySQL2 (base de données)
- JWT (authentification)
- bcrypt (chiffrement)
- Stripe (paiements)
- CORS (sécurité)

**Frontend :**
- Angular 17
- TypeScript
- RxJS (reactive programming)
- Angular Router
- Angular Forms

## ✅ Cahier des Charges - Status

| Fonctionnalité | Status | Description |
|----------------|--------|-------------|
| **Catalogue de produits** | ✅ | Grille responsive avec images et prix |
| **Page single product** | ✅ | Page détail avec description complète |
| **Model CRUD MYSQL** | ✅ | Tables User et Product créées |
| **Authentification** | ✅ | JWT avec middleware CheckJwt() |
| **Route /login** | ✅ | Connexion avec email/password |
| **BONUS Paiement** | ✅ | Stripe Checkout intégré |
| **Route /checkout** | ✅ | Génération d'URL de paiement |

## 🎉 Conclusion

Le projet MiniShop est **100% fonctionnel** et répond à toutes les exigences du cahier des charges :

- ✅ **Stack technique respectée** : Node.js/Express + Angular
- ✅ **Base de données** : MySQL avec Docker
- ✅ **Toutes les routes API** implémentées
- ✅ **Interface moderne** et responsive
- ✅ **Sécurité** avec JWT et bcrypt
- ✅ **Paiements** avec Stripe (bonus)
- ✅ **Documentation complète**

