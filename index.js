require('dotenv').config();
const express = require('express')
const app = express();
const { connectDB, closeDB } = require('./db_connection')
const  authRoutes = require('./routes/authRoutes')
const applicationRoutes = require('./routes/applicationRoutes')
const jobRoutes = require('./routes/jobRoutes')

//using express.js framework
app.use(express.json());

//connecting to postgresql database
connectDB();

//base url for authentication routes
app.use('/api/auth',authRoutes)

//base url for job routes
app.use('/api/jobs',jobRoutes)

//base url for application routes
app.use('/api/applications',applicationRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});