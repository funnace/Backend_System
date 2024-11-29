'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    CREATE TABLE job_providers (
      id SERIAL PRIMARY KEY,  -- Unique identifier for the job provider
      email VARCHAR(255) UNIQUE NOT NULL,  -- Email of the job provider (unique)
      password VARCHAR(255) NOT NULL,  -- Hashed password for the provider
      company_name VARCHAR(255) NOT NULL,  -- Name of the company
      website VARCHAR(255),  -- Website URL of the company
      industry VARCHAR(100),  -- Industry type (e.g., Tech, Healthcare, etc.)
      contact_number VARCHAR(15),  -- Contact number of the company
      address TEXT,  -- Physical address of the company
      company_description TEXT,  -- Description of the company (optional)
      role VARCHAR(20) NOT NULL DEFAULT 'job_provider',  -- Role is fixed as 'job_provider'
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp when the company profile is created
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp when the company profile was last updated
    );
    
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS "job_providers";
    `);
  }
};
