'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const plainPassword = 'adminPassword123';

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Insert the admin user with the hashed password
    await queryInterface.bulkInsert('admins', [
      {
        first_name: 'Admin',
        last_name: 'User',
        email: 'admin@example.com',
        password: hashedPassword, 
        role: 'admin',             
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    // Reverting the changes: Delete all entries from the admins table
    await queryInterface.bulkDelete('admins', null, {});
  }
};