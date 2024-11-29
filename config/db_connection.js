const { Client } = require('pg');

const db = new Client({
  host: process.env.HOST,       
  port: process.env.DB_PORT,                  
  user: process.env.USER,       
  password: process.env.DB_PASSWORD,   
  database: 'JobSeek',   
});

async function connectDB() {
  try {
    // Connect to the database
    await db.connect();
    console.log('Connected to PostgreSQL database');
  } catch (err) {
    console.error('Connection error', err.stack);
  }
}

// Close the connection
async function closeDB() {
  await db.end();
  console.log('Disconnected from PostgreSQL database');
}

module.exports = {
  db,
  connectDB,
  closeDB
};
