const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function createTestUser() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3307,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'minishop'
  });

  try {
    // Check if user already exists
    const [existing] = await pool.execute('SELECT id FROM users WHERE email = ?', ['demo@minishop.com']);
    
    if (existing.length === 0) {
      // Hash the password
      const hashedPassword = await bcrypt.hash('demo123', 10);
      
      // Create the test user
      await pool.execute(
        'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
        ['Demo User', 'demo@minishop.com', hashedPassword]
      );
      console.log('✅ Test user created successfully!');
      console.log('📧 Email: demo@minishop.com');
      console.log('🔒 Password: demo123');
    } else {
      console.log('✅ Test user already exists');
      console.log('📧 Email: demo@minishop.com');
      console.log('🔒 Password: demo123');
    }
  } catch (error) {
    console.error('❌ Error creating test user:', error.message);
  } finally {
    await pool.end();
  }
}

createTestUser().then(() => {
  process.exit(0);
}).catch(error => {
  console.error('❌ Script error:', error);
  process.exit(1);
});
