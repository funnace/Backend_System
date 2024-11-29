const { db } = require('../../config/db_connection')
const { jobUpdateSchema } = require('../../Schema/validationSchema/jobSchemas')

// Get all applications for an job
const getApplicationsAdmin = async (req, res) => {
    const { jobId } = req.params;
    try {
      const result = await db.query('SELECT * FROM job_applications WHERE job_posting_id = $1', [jobId]);
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  // Get a specific application
const getApplicationAdmin = async (req, res) => {
    const { applicationId } = req.params;
    try {
      const result = await db.query('SELECT * FROM job_applications WHERE id = $1', [applicationId]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Application not found' });
      }
      res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  // Update a specific application
const updateApplicationAdmin = async (req, res) => {
    const { applicationId } = req.params;
    const { error } = jobUpdateSchema.validate(req.body);
  
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    const { application_status } = req.body;
  
    try {
      const result = await db.query(
        'UPDATE job_applications SET application_status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
        [application_status, applicationId]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Application not found' });
      }
  
      res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  // Delete a specific application
const deleteApplicationAdmin = async (req, res) => {
    const { applicationId } = req.params;
    try {
      const result = await db.query('DELETE FROM job_applications WHERE id = $1 RETURNING *', [applicationId]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Application not found' });
      }
  
      res.status(200).json({ message: 'Application deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
// Get all applications
const getAllApplicationsAdmin = async (req,res) => {
    try {
        const result = await db.query('SELECT * FROM job_applications');
        res.status(200).json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
      }
};

  module.exports = { updateApplicationAdmin, deleteApplicationAdmin, getApplicationAdmin, getApplicationsAdmin, getAllApplicationsAdmin}