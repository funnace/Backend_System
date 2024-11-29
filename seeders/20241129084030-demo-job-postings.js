'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const jobProviders = await queryInterface.sequelize.query(
      'SELECT id FROM "job_providers";',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const providerIds = jobProviders.map(provider => provider.id);

    await queryInterface.bulkInsert('job_postings', [
      {
        provider_id: providerIds[0],
        title: 'Software Engineer',
        description: 'We are looking for a skilled Software Engineer with experience in Node.js and React.',
        location: 'San Francisco, CA',
        salary: '130000',
        job_type: 'Full-time',
        application_deadline: new Date('2024-12-31'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        provider_id: providerIds[1],
        title: 'Frontend Developer',
        description: 'Join our team as a Frontend Developer working with modern web technologies.',
        location: 'Remote',
        salary: '90000',
        job_type: 'Contract',
        application_deadline: new Date('2024-12-31'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        provider_id: providerIds[2],
        title: 'Product Manager',
        description: 'Looking for a Product Manager with strong leadership and organizational skills.',
        location: 'New York, NY',
        salary: '150000',
        job_type: 'Full-time',
        application_deadline: new Date('2025-01-31'),
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('job_postings', null, {});
  }
};