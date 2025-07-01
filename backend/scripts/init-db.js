const { initializeDatabase } = require('../config/database');

// Script pour initialiser la base de données
async function main() {
  console.log('🔄 Initialisation de la base de données...');
  await initializeDatabase();
  console.log('✅ Initialisation terminée');
  process.exit(0);
}

main().catch(error => {
  console.error('❌ Erreur:', error);
  process.exit(1);
});
