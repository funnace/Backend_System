require('dotenv').config();

module.exports = {
  //Development Database
  development: {
    host: process.env.HOST,       
    port: process.env.DB_PORT,                  
    username: process.env.USER,       
    password: process.env.DB_PASSWORD,   
    database: 'JobSeek',   
    dialect: 'postgres',
    logging: true,
  },

    //Testing Database
  test: {
    host: process.env.HOST,       
    port: process.env.DB_PORT,                  
    user: process.env.USER,       
    password: process.env.DB_PASSWORD,   
    database: 'JobSeek',   
    dialect: 'postgres',
    logging: false,
  },

    //Production Database
  production: {
    host: process.env.HOST,       
    port: process.env.DB_PORT,                  
    user: process.env.USER,       
    password: process.env.DB_PASSWORD,   
    database: 'JobSeek',   
    dialect: 'postgres',
    logging: false,
  },
};
