'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Array of objects with email and password
    const users = [
      { email: 'john.doe@example.com', password: 'password123' },
      { email: 'jane.doe@example.com', password: 'password456' },
      { email: 'mark.smith@example.com', password: 'password789' }
    ];

    // Hashing the passwords before inserting them into the database
    const hashedUsers = await Promise.all(users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return {
        email: user.email,
        password: hashedPassword,  // Hash the password
        first_name: user.first_name || user.email.split('@')[0],
        last_name: user.last_name || 'Doe',
        phone_number: '555-0000000',
        role: 'job_seeker',
        created_at: new Date(),
        updated_at: new Date(),
      };
    }));

    // Insert the users with hashed passwords
    await queryInterface.bulkInsert('job_seekers', hashedUsers);
  },

  async down (queryInterface, Sequelize) {
    // Reverting the changes: Delete all entries from job_seekers
    await queryInterface.bulkDelete('job_seekers', null, {});
  }
};