const express = require('express');
const { checkRole, authenticateJWT } = require('../middlewares/authMiddleware');
const { getAllJobs } = require('../controllers/job/userControllers');
const { getJobs, postJob, getJob, updateJob, deleteJob } = require('../controllers/job/providerControllers');
const { getAllJobsAdmin, getJobAdmin, updateJobAdmin , deleteJobAdmin } = require('../controllers/job/adminControllers');
const router = express.Router();

//job_seeker apis
// Fetch all job postings
router.get('/job_seeker',authenticateJWT, checkRole('job_seeker'), getAllJobs)



//job_provider apis
// Get all job postings for a specific provider
router.get('/job_provider',authenticateJWT, checkRole('job_provider'), getJobs)

// Post a new job
router.post('/job_provider',authenticateJWT, checkRole('job_provider'), postJob)

// Get a specific job posting by the provider through jobId
router.get('/job_provider/:jobId',authenticateJWT, checkRole('job_provider'), getJob)

// Update an existing job posting
router.put('/job_provider/:jobId',authenticateJWT, checkRole('job_provider'), updateJob)

// Delete an existing job posting
router.delete('/job_provider/:jobId',authenticateJWT, checkRole('job_provider'), deleteJob)



//Admin apis
// Get all job postings
router.get('/admin',authenticateJWT, checkRole('admin'), getAllJobsAdmin)

// Get a specific job posting through job_id
router.get('/admin/:jobId',authenticateJWT, checkRole('admin'), getJobAdmin)

// Update a specific job posting through job_id
router.put('/admin/:jobId',authenticateJWT, checkRole('admin'), updateJobAdmin)

// Delete a specific job posting through job_id
router.delete('/admin/:jobId',authenticateJWT, checkRole('admin'), deleteJobAdmin)

module.exports = router