const express = require('express');
const { updateApplication, getApplication, getApplications } = require('../controllers/applications/providerControllers');
const { updateApplicationAdmin, deleteApplicationAdmin, getApplicationAdmin, getApplicationsAdmin, getAllApplicationsAdmin } = require('../controllers/applications/adminControllers');
const { getAllApplications } = require('../controllers/applications/userControllers');
const { checkRole, authenticateJWT } = require('../middlewares/authMiddleware');
const router = express.Router();

// job_seeker role apis
// Get all applications of a particular user
router.get('/job_seeker',authenticateJWT,checkRole('job_seeker'), getAllApplications)



// job_provider role apis
// Get all applications for a particular job posting
router.get('job_provider/:jobId',authenticateJWT,checkRole('job_provider'), getApplications)

// Get a specific application for a provider
router.get('job_provider/applied/:applicationId',authenticateJWT,checkRole('job_provider'),getApplication)

// Update a specific application for a provider
router.put('job_provider/applied/:applicationId',authenticateJWT,checkRole('job_provider'),updateApplication)



//admin role apis
// Get all applications
router.get('/admin',authenticateJWT,checkRole('admin'), getAllApplicationsAdmin)

// Get all applications for a job
router.get('/admin/:jobId', getApplicationsAdmin)

// Get a specific application
router.get('/admin/applied/:applicationId',authenticateJWT,checkRole('admin'),getApplicationAdmin)

// Update a specific application
router.put('/admin/applied/:applicationId',authenticateJWT,checkRole('admin'), updateApplicationAdmin)

// Delete a specific application
router.delete('/admin/applied/:applicationId',authenticateJWT,checkRole('admin'), deleteApplicationAdmin)

module.exports = router