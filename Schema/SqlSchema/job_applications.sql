CREATE TABLE job_applications (
  id SERIAL PRIMARY KEY,                   -- Unique identifier for the job application
  job_posting_id INTEGER REFERENCES job_postings(id) ON DELETE CASCADE, -- Foreign key to the job postings table
  job_seeker_id INTEGER REFERENCES job_seekers(id) ON DELETE CASCADE, -- Foreign key to the job seekers table
  resume TEXT,                             -- Path or content of the resume uploaded by the job seeker
  cover_letter TEXT,                       -- Optional cover letter uploaded by the job seeker
  application_status VARCHAR(20) DEFAULT 'pending', -- Status of the application (pending, accepted, rejected)
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Time when the application was submitted
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- Time when the application was last updated
);