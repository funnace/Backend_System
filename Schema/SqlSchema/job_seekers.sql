CREATE TABLE job_seekers (
  id SERIAL PRIMARY KEY,  -- Unique identifier for the job seeker
  email VARCHAR(255) UNIQUE NOT NULL,  -- Email of the job seeker (unique)
  password VARCHAR(255) NOT NULL,  -- Hashed password for the user
  first_name VARCHAR(100),  -- First name of the job seeker
  last_name VARCHAR(100),  -- Last name of the job seeker
  phone_number VARCHAR(15),  -- Phone number of the job seeker (optional)
  role VARCHAR(20) CHECK (role = 'job_seekers') NOT NULL,  -- Role is fixed as 'job_seekers'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp when the profile is created
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp when the profile was last updated
);
