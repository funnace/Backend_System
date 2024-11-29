const { db } = require('../../config/db_connection')
const { jobUpdateSchema } = require('../../Schema/validationSchema/jobSchemas')

// Get all applications for a particular job posting
const getApplications = async (req, res) => {
    const { jobId } = req.params;
    try {
      const result = await db.query('SELECT * FROM job_applications WHERE job_posting_id = $1', [jobId]);
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

// Get a specific application for a provider
const getApplication = async (req, res) => {
    const { applicationId } = req.params;
    try {
      const applicationResult = await db.query(
        'SELECT * FROM job_applications WHERE id = $1', 
        [applicationId]
      );
  
      // If application does not exist, return an error
      if (applicationResult.rows.length === 0) {
        return res.status(404).json({ message: 'Application not found' });
      }
  
      const application = applicationResult.rows[0];
  
      // Check if the job posting belongs to the logged-in provider
      const jobPostingResult = await db.query(
        'SELECT * FROM job_postings WHERE id = $1 AND provider_id = $2',
        [application.job_posting_id, req.user.id]
      );
  
      // If no matching job posting found for this provider, return an error
      if (jobPostingResult.rows.length === 0) {
        return res.status(403).json({ message: 'You are not the provider of this job posting' });
      }

      res.status(200).json(application);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

// Update a specific application for a provider
const updateApplication = async (req, res) => {
  const { applicationId } = req.params;
  const { error } = jobUpdateSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { application_status } = req.body;

  try {
    // Check if the application exists in job_applications table
    const applicationResult = await db.query(
      'SELECT * FROM job_applications WHERE id = $1',
      [applicationId]
    );

    if (applicationResult.rows.length === 0) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const application = applicationResult.rows[0];

    // Check if the job posting belongs to the logged-in provider
    const jobPostingResult = await db.query(
      'SELECT * FROM job_postings WHERE id = $1 AND provider_id = $2',
      [application.job_posting_id, req.user.id]
    );

    // If no matching job posting found for this provider, return an error
    if (jobPostingResult.rows.length === 0) {
      return res.status(403).json({ message: 'You are not the provider of this job posting' });
    }

    // Proceed with updating the application status
    const updateResult = await db.query(
      'UPDATE job_applications SET application_status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [application_status, applicationId]
    );

    if (updateResult.rows.length === 0) {
      return res.status(404).json({ message: 'Application not found or update failed' });
    }

    // Return the updated application
    res.status(200).json({
      message: 'Application updated successfully',
      application: updateResult.rows[0]
    });
    
  } catch (err) {
    console.error('Error updating application:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { updateApplication, getApplication, getApplications }