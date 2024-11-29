'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // List of passwords
    const passwords = [
      'password123',
      'password456',
      'password789'
    ];

    // Hashing the passwords before inserting them into the database
    const hashedPasswords = await Promise.all(passwords.map(async (password) => {
      return await bcrypt.hash(password, 10);
    }));

    // Insert job providers with hashed passwords
    await queryInterface.bulkInsert('job_providers', [
      {
        email: 'techcorp@example.com',
        password: hashedPasswords[0],
        company_name: 'TechCorp Solutions',
        website: 'https://www.techcorp.com',
        industry: 'Technology',
        contact_number: '1234567890',
        address: '123 Tech Street, Silicon Valley, CA',
        company_description: 'Leading provider of tech solutions to businesses worldwide.',
        role: 'job_provider',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'healthcareplus@example.com',
        password: hashedPasswords[1],
        company_name: 'HealthcarePlus',
        website: 'https://www.healthcareplus.com',
        industry: 'Healthcare',
        contact_number: '9876543210',
        address: '456 Wellness Avenue, New York, NY',
        company_description: 'Innovative healthcare services to improve patient outcomes.',
        role: 'job_provider',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'fintechinnovators@example.com',
        password: hashedPasswords[2],
        company_name: 'FinTech Innovators',
        website: 'https://www.fintechinnovators.com',
        industry: 'Finance',
        contact_number: '1122334455',
        address: '789 Finance Blvd, London, UK',
        company_description: 'Fintech solutions for modern banking and finance.',
        role: 'job_provider',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    // Reverting the changes: Delete all entries from job_providers
    await queryInterface.bulkDelete('job_providers', null, {});
  }
};
