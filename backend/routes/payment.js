const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { checkJwt } = require('../middleware/auth');
const { pool } = require('../config/database');

const router = express.Router();

// POST /checkout - Générer une session de paiement Stripe (PROTÉGÉ)
router.post('/checkout', checkJwt, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ 
        error: 'ID du produit requis' 
      });
    }

    // Récupérer les détails du produit
    const [products] = await pool.execute(
      'SELECT * FROM products WHERE id = ?',
      [productId]
    );

    if (products.length === 0) {
      return res.status(404).json({ 
        error: 'Produit non trouvé' 
      });
    }

    const product = products[0];

    // Vérifier le stock
    if (product.stock_quantity < quantity) {
      return res.status(400).json({ 
        error: 'Stock insuffisant' 
      });
    }

    // Créer la session de paiement Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: product.name,
              description: product.description,
              images: product.image_url ? [product.image_url] : [],
            },
            unit_amount: Math.round(product.price * 100), // Stripe utilise les centimes
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
      metadata: {
        productId: product.id.toString(),
        userId: req.user.userId.toString(),
        quantity: quantity.toString()
      }
    });

    res.json({
      success: true,
      checkout_url: session.url,
      session_id: session.id
    });
  } catch (error) {
    console.error('Erreur lors de la création de la session de paiement:', error);
    res.status(500).json({ 
      error: 'Erreur serveur lors de la création de la session de paiement' 
    });
  }
});

// GET /checkout/success - Vérifier le succès du paiement
router.get('/checkout/success/:sessionId', async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === 'paid') {
      // Ici vous pourriez mettre à jour le stock, créer une commande, etc.
      res.json({
        success: true,
        message: 'Paiement réussi',
        session: {
          id: session.id,
          amount_total: session.amount_total,
          currency: session.currency,
          payment_status: session.payment_status
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Paiement non confirmé'
      });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification du paiement:', error);
    res.status(500).json({ 
      error: 'Erreur serveur lors de la vérification du paiement' 
    });
  }
});

module.exports = router;
