const { db } = require('../../db_connection');

const getAllJobs = async (req, res) => {
    try {
      // Fetch all job postings
      const result = await db.query('SELECT * FROM job_postings WHERE status = $1', ['open']);
  
      res.status(200).json(result.rows);  // Return job postings
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

  module.exports = { getAllJobs }