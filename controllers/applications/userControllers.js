const { db } = require('../../config/db_connection')

// Get all the applied applications
const getAllApplications = async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM job_applications WHERE job_seeker_id = $1', [req.user.id]);
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

module.exports = { getAllApplications }