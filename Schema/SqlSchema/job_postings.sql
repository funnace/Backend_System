CREATE TABLE job_postings (
  id SERIAL PRIMARY KEY,                  -- Unique identifier for the job posting
  provider_id INTEGER REFERENCES job_providers(id) ON DELETE CASCADE, -- Foreign key to the providers table
  title VARCHAR(255) NOT NULL,             -- Job title
  description TEXT NOT NULL,              -- Job description
  location VARCHAR(255),                  -- Job location
  salary DECIMAL(10, 2),                   -- Job salary (e.g., annual salary)
  job_type VARCHAR(50),                   -- Type of job (full-time, part-time, remote, etc.)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Time when the job was posted
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Time when the job was last updated
  status VARCHAR(20) DEFAULT 'open',      -- Status of the job (open, closed)
  application_deadline TIMESTAMP          -- Deadline for job applications
);
