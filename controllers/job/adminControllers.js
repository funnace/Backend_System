const { db } = require('../../db_connection');
const { jobUpdateSchema } = require('../../Schema/validationSchema/jobSchemas');

// Get all job postings
const getAllJobsAdmin = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM job_postings');
    res.status(200).json(result.rows);  // Return all job postings
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get a specific job posting through job_id
const getJobAdmin = async (req, res) => {
  const { jobId } = req.params;

  try {
    const result = await db.query('SELECT * FROM job_postings WHERE id = $1', [jobId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Job posting not found' });
    }

    res.status(200).json(result.rows[0]);  // Return the specific job posting
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update a specific job posting (admin)
const updateJobAdmin = async (req, res) => {
  const { jobId } = req.params;
  const { error } = jobUpdateSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { title, description, salary, location, status, application_deadline } = req.body;

  try {
    const result = await db.query(
      'UPDATE job_postings SET title = $1, description = $2, salary = $3, location = $4, status = $5, application_deadline = $6, updated_at = NOW() WHERE id = $7 RETURNING *',
      [title, description, salary, location, status, application_deadline, jobId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Job posting not found' });
    }

    res.status(200).json(result.rows[0]);  // Return the updated job posting
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a job posting (admin)
const deleteJobAdmin = async (req, res) => {
  const { jobId } = req.params;

  try {
    const result = await db.query('DELETE FROM job_postings WHERE id = $1 RETURNING *', [jobId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Job posting not found' });
    }

    res.status(200).json({ message: 'Job posting deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  getAllJobsAdmin,
  getJobAdmin,
  updateJobAdmin,
  deleteJobAdmin,
};
