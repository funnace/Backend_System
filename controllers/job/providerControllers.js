const { db } = require('../../config/db_connection')
const { jobCreationSchema, jobUpdateSchema } = require('../../Schema/validationSchema/jobSchemas');

// Get all job postings for a specific provider
const getJobs = async (req, res) => {
  const providerId = req.user.id;     // Extract provider ID from the authenticated user
  try {
    const result = await db.query('SELECT * FROM job_postings WHERE provider_id = $1', [providerId]);
    res.status(200).json(result.rows);  // Return job postings by the provider
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Post a new job
const postJob = async (req, res) => {
  const { error } = jobCreationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { title, description, salary, location, job_type, application_deadline } = req.body;
  const providerId = req.user.id;  // Extract provider ID from authenticated user

  try {
    // Insert new job posting for the provider
    const result = await db.query(
      'INSERT INTO job_postings (provider_id, title, description, salary, location, job_type, application_deadline, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()) RETURNING *',
      [providerId, title, description, salary, location, job_type, application_deadline, 'open']
    );

    res.status(201).json(result.rows[0]);  // Return the newly created job posting
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get a specific job posting by the provider through jobId
const getJob = async (req, res) => {
  const { jobId } = req.params;
  const providerId = req.user.id;  // Extract provider ID from authenticated user

  try {
    const result = await db.query(
      'SELECT * FROM job_postings WHERE id = $1 AND provider_id = $2',
      [jobId, providerId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Job posting not found or you are not authorized to access it' });
    }

    res.status(200).json(result.rows[0]);  // Return the specific job posting
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update an existing job posting
const updateJob = async (req, res) => {
  const { jobId } = req.params;
  const { error } = jobUpdateSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { title, description, salary, location, status, application_deadline } = req.body;
  const providerId = req.user.id;  // Extract provider ID from authenticated user

  try {
    const result = await db.query(
      'UPDATE job_postings SET title = $1, description = $2, salary = $3, location = $4, status = $5, application_deadline = $6, updated_at = NOW() WHERE id = $7 AND provider_id = $8 RETURNING *',
      [title, description, salary, location, status, application_deadline, jobId, providerId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Job posting not found or you are not authorized to update it' });
    }

    res.status(200).json(result.rows[0]);  // Return the updated job posting
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a job posting
const deleteJob = async (req, res) => {
  const { jobId } = req.params;
  const providerId = req.user.id;  // Extract provider ID from authenticated user

  try {
    const result = await db.query(
      'DELETE FROM job_postings WHERE id = $1 AND provider_id = $2 RETURNING *',
      [jobId, providerId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Job posting not found or you are not authorized to delete it' });
    }

    res.status(200).json({ message: 'Job posting deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  getJobs,
  postJob,
  getJob,
  updateJob,
  deleteJob,
};
