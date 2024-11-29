CREATE TABLE admins (
  id SERIAL PRIMARY KEY,              -- Unique identifier for the admin
  email VARCHAR(255) UNIQUE NOT NULL,  -- Admin email (unique)
  password VARCHAR(255) NOT NULL,      -- Hashed password
  first_name VARCHAR(100),            -- Admin's first name
  last_name VARCHAR(100),             -- Admin's last name
  role VARCHAR(20) CHECK (role = 'admin') NOT NULL,  -- Fixed role 'admin'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Profile creation time
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- Profile last updated time
);