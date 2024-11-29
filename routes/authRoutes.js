const express = require('express');
const router = express.Router();
const { userLogin, userRegister,userLogout } = require('../controllers/auth/userControllers');
const { providerLogin, providerRegister,providerLogout } = require('../controllers/auth/providerControllers');
const { adminLogin, adminRegister,adminLogout } = require('../controllers/auth/adminControllers');

// Job_seeker apis
// Job_Seeker Login
router.post('/job_seeker/login', userLogin)

// Job_Seeker Logout
router.post('/job_seeker/logout', userLogout)

// Job_Seeker Registration
router.post('/job_seeker/register',userRegister)



//job_provider apis
//job_provider login
router.post('/job_provider/login',providerLogin)

//job_provider logout
router.post('/job_provider/logout',providerLogout)

//job_provider registration
router.post('/job_provider/register',providerRegister)



//admin apis
//admin login
router.post('/admin/login',adminLogin)

//admin logout
router.post('/admin/logout',adminLogout)

//admin registration
router.post('/admin/register',adminRegister)


module.exports = router