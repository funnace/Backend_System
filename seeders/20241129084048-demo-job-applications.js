'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const jobPostings = await queryInterface.sequelize.query(
      'SELECT id FROM "job_postings";',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const jobSeekers = await queryInterface.sequelize.query(
      'SELECT id FROM "job_seekers";',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const postingIds = jobPostings.map(posting => posting.id);
    const seekerIds = jobSeekers.map(seeker => seeker.id);

    // Seed job applications
    await queryInterface.bulkInsert('job_applications', [
      {
        job_posting_id: postingIds[0],
        job_seeker_id: seekerIds[0],
        resume: 'path/to/resume_1.pdf',
        cover_letter: 'This is my cover letter for the Software Engineer position.',
        application_status: 'pending',
        applied_at: new Date(),
        updated_at: new Date(),
      },
      {
        job_posting_id: postingIds[1],
        job_seeker_id: seekerIds[1],
        resume: 'path/to/resume_2.pdf',
        cover_letter: 'I am very excited to apply for the Frontend Developer role!',
        application_status: 'pending',
        applied_at: new Date(),
        updated_at: new Date(),
      },
      {
        job_posting_id: postingIds[2],
        job_seeker_id: seekerIds[2],
        resume: 'path/to/resume_3.pdf',
        cover_letter: 'As a Product Manager, I believe I can help take your company to the next level.',
        application_status: 'accepted',
        applied_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('job_applications', null, {});
  }
};
