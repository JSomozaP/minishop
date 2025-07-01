const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
  waitForConnections: true
};

const pool = mysql.createPool(dbConfig);

// Initialiser les tables de la base de données
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Créer la table users
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Créer la table products
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image_url VARCHAR(500),
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Insérer des produits d'exemple si la table est vide
    const [products] = await connection.execute('SELECT COUNT(*) as count FROM products');
    if (products[0].count === 0) {
      await connection.execute(`
        INSERT INTO products (name, description, price, image_url, stock_quantity) VALUES
        ('Laptop Gaming Pro', 'Ordinateur portable haute performance pour gamers', 1299.99, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500', 10),
        ('Casque Audio Sans Fil', 'Casque premium avec réduction de bruit active', 199.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', 25),
        ('Smartphone Flagship', 'Dernier smartphone avec fonctionnalités avancées', 899.99, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500', 15),
        ('Souris Gaming RGB', 'Souris de précision pour gaming avec éclairage RGB', 79.99, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500', 30),
        ('Clavier Mécanique', 'Clavier mécanique premium pour passionnés', 149.99, 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500', 20),
        ('Tablette Graphique', 'Tablette pour designers et artistes numériques', 299.99, 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=500', 12)
      `);
    }

    connection.release();
    console.log('✅ Base de données initialisée avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', error);
  }
}

module.exports = { pool, initializeDatabase };
