const express = require('express');
const { pool } = require('../config/database');
const { checkJwt } = require('../middleware/auth');

const router = express.Router();

// GET /products - Récupérer tous les produits (PUBLIC)
router.get('/products', async (req, res) => {
  try {
    const [products] = await pool.execute(
      'SELECT * FROM products ORDER BY created_at DESC'
    );
    
    res.json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({ 
      error: 'Erreur serveur lors de la récupération des produits' 
    });
  }
});

// GET /product/:id - Récupérer un produit spécifique (PUBLIC)
router.get('/product/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    
    const [products] = await pool.execute(
      'SELECT * FROM products WHERE id = ?',
      [productId]
    );

    if (products.length === 0) {
      return res.status(404).json({ 
        error: 'Produit non trouvé' 
      });
    }

    res.json({
      success: true,
      product: products[0]
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    res.status(500).json({ 
      error: 'Erreur serveur lors de la récupération du produit' 
    });
  }
});

// POST /product - Ajouter un nouveau produit (PROTÉGÉ)
router.post('/product', checkJwt, async (req, res) => {
  try {
    const { name, description, price, image_url, stock_quantity } = req.body;

    if (!name || !price) {
      return res.status(400).json({ 
        error: 'Nom et prix requis' 
      });
    }

    const [result] = await pool.execute(
      'INSERT INTO products (name, description, price, image_url, stock_quantity) VALUES (?, ?, ?, ?, ?)',
      [name, description || '', price, image_url || '', stock_quantity || 0]
    );

    res.status(201).json({
      success: true,
      message: 'Produit créé avec succès',
      productId: result.insertId
    });
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
    res.status(500).json({ 
      error: 'Erreur serveur lors de la création du produit' 
    });
  }
});

// PUT /product - Mettre à jour un produit (PROTÉGÉ)
router.put('/product', checkJwt, async (req, res) => {
  try {
    const { id, name, description, price, image_url, stock_quantity } = req.body;

    if (!id || !name || !price) {
      return res.status(400).json({ 
        error: 'ID, nom et prix requis' 
      });
    }

    const [result] = await pool.execute(
      'UPDATE products SET name = ?, description = ?, price = ?, image_url = ?, stock_quantity = ? WHERE id = ?',
      [name, description || '', price, image_url || '', stock_quantity || 0, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        error: 'Produit non trouvé' 
      });
    }

    res.json({
      success: true,
      message: 'Produit mis à jour avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit:', error);
    res.status(500).json({ 
      error: 'Erreur serveur lors de la mise à jour du produit' 
    });
  }
});

// DELETE /products/:id - Supprimer un produit (PROTÉGÉ)
router.delete('/products/:id', checkJwt, async (req, res) => {
  try {
    const productId = req.params.id;
    
    const [result] = await pool.execute(
      'DELETE FROM products WHERE id = ?',
      [productId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        error: 'Produit non trouvé' 
      });
    }

    res.json({
      success: true,
      message: 'Produit supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    res.status(500).json({ 
      error: 'Erreur serveur lors de la suppression du produit' 
    });
  }
});

module.exports = router;
