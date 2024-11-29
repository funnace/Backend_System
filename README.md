# Node.js Express Backend Project with PostgreSQL

## Overview
This project is a backend system built with **Node.js**, **Express.js**, and **PostgreSQL**, designed for a job portal application. It provides RESTful APIs for user authentication, job postings, and application management with role-based access control (RBAC). 

The backend supports three user roles:
- **Job Seeker**
- **Job Provider**
- **Admin**

---

## Features
- Secure user authentication using **JWT**.
- Role-based access control for user operations.
- Input validation with **Joi**.
- PostgreSQL database integration with **Sequelize ORM** for data migrations and seeders.

---

## Table of Contents
1. [Installation](#installation)
2. [Environment Variables](#environment-variables)
3. [API Documentation](#api-documentation)
4. [Validation](#validation)
5. [Key Dependencies](#key-dependencies)
6. [Scripts](#scripts)
7. [Future Enhancements](#future-enhancements)
8. [License](#license)

---

## Installation

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Environment Variables
Create a .env file in the root directory with the following content:

```bash
USER=postgres
DB_PASSWORD=qsqqsx
HOST=localhost
DB_PORT=5432
PORT=5000
JWT_SECRET=88018ad9e
```

### Step 4: Run Database Migrations and Seeders
```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

---

### API Endpoints Overview

#### **Authentication and Registration APIs**
### Base Url: api/auth/

#### **Job Seeker APIs**

| **Endpoint**        | **Method** | **Role**       | **Description**                             |
|---------------------|------------|----------------|---------------------------------------------|
| `/job_seeker/login` | POST       | Job Seeker     | Log in as a Job Seeker.                    |
| `/job_seeker/logout`| POST       | Job Seeker     | Log out as a Job Seeker.                   |
| `/job_seeker/register`| POST     | Job Seeker     | Register as a Job Seeker.                  |

#### **Job Provider APIs**

| **Endpoint**        | **Method** | **Role**       | **Description**                             |
|---------------------|------------|----------------|---------------------------------------------|
| `/job_provider/login`| POST      | Job Provider   | Log in as a Job Provider.                  |
| `/job_provider/logout`| POST     | Job Provider   | Log out as a Job Provider.                 |
| `/job_provider/register`| POST   | Job Provider   | Register as a Job Provider.                |

#### **Admin APIs**

| **Endpoint**        | **Method** | **Role**       | **Description**                             |
|---------------------|------------|----------------|---------------------------------------------|
| `/admin/login`      | POST       | Admin          | Log in as an Admin.                        |
| `/admin/logout`     | POST       | Admin          | Log out as an Admin.                       |
| `/admin/register`   | POST       | Admin          | Register as an Admin.                      |

<br>

### API Endpoints Overview for Jobs
### Base Url: api/jobs/


#### **Job Seeker APIs**

| **Endpoint**        | **Method** | **Role**       | **Description**                             |
|---------------------|------------|----------------|---------------------------------------------|
| `/job_seeker`       | GET        | Job Seeker     | Fetch all job postings.                    |

#### **Job Provider APIs**

| **Endpoint**        | **Method** | **Role**       | **Description**                             |
|---------------------|------------|----------------|---------------------------------------------|
| `/job_provider`     | GET        | Job Provider   | Get all job postings for a specific provider. |
| `/job_provider`     | POST       | Job Provider   | Post a new job.                            |
| `/job_provider/:jobId` | GET     | Job Provider   | Get a specific job posting by ID.          |
| `/job_provider/:jobId` | PUT     | Job Provider   | Update an existing job posting.            |
| `/job_provider/:jobId` | DELETE  | Job Provider   | Delete a job posting.                      |

#### **Admin APIs**

| **Endpoint**        | **Method** | **Role**       | **Description**                             |
|---------------------|------------|----------------|---------------------------------------------|
| `/admin`            | GET        | Admin          | Get all job postings.                      |
| `/admin/:jobId`     | GET        | Admin          | Get a specific job posting by ID.          |
| `/admin/:jobId`     | PUT        | Admin          | Update a job posting.                      |
| `/admin/:jobId`     | DELETE     | Admin          | Delete a job posting.

<br>

### API Endpoints Overview for Applications
### Base Url: api/applications/

#### **Job Seeker APIs**

| **Endpoint**            | **Method** | **Role**       | **Description**                                   |
|-------------------------|------------|----------------|---------------------------------------------------|
| `/job_seeker`           | GET        | Job Seeker     | Get all applications of a particular user.        |

#### **Job Provider APIs**

| **Endpoint**                | **Method** | **Role**       | **Description**                                     |
|-----------------------------|------------|----------------|-----------------------------------------------------|
| `/job_provider/:jobId`      | GET        | Job Provider   | Get all applications for a particular job posting.  |
| `/job_provider/applied/:applicationId` | GET    | Job Provider   | Get a specific application for a provider.          |
| `/job_provider/applied/:applicationId` | PUT    | Job Provider   | Update a specific application for a provider.       |

#### **Admin APIs**

| **Endpoint**                | **Method** | **Role**       | **Description**                                     |
|-----------------------------|------------|----------------|-----------------------------------------------------|
| `/admin`                    | GET        | Admin          | Get all applications.                              |
| `/admin/:jobId`             | GET        | Admin          | Get all applications for a particular job.         |
| `/admin/applied/:applicationId` | GET      | Admin          | Get a specific application.                        |
| `/admin/applied/:applicationId` | PUT      | Admin          | Update a specific application.                     |
| `/admin/applied/:applicationId` | DELETE   | Admin          | Delete a specific application.                     |

---

# Validation with Joi

Joi is used to validate incoming data and provide meaningful error messages, ensuring that user input meets the required criteria. Below is an example of a Joi schema used for user registration.

## Example Schema for User Registration

```javascript
const Joi = require('joi');

const userRegistrationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'string.empty': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.empty': 'Password is required'
  }),
  first_name: Joi.string().min(2).required().messages({
    'string.min': 'First name must be at least 2 characters long',
    'string.empty': 'First name is required'
  }),
  last_name: Joi.string().min(2).required().messages({
    'string.min': 'Last name must be at least 2 characters long',
    'string.empty': 'Last name is required'
  }),
  phone_number: Joi.string().optional(),
});

module.exports = { userRegistrationSchema };
```
 
Key Dependencies
# Key Dependencies

| **Dependency**       | **Version**  | **Purpose**                                           |
|----------------------|--------------|-------------------------------------------------------|
| `express`            | ^4.21.1      | Web framework for Node.js.                            |
| `bcrypt`             | ^5.1.1       | Secure password hashing.                             |
| `dotenv`             | ^16.4.5      | Environment variable management.                     |
| `jsonwebtoken`       | ^9.0.2       | Token-based authentication.                          |
| `pg`                 | ^8.13.1      | PostgreSQL client for Node.js.                       |
| `sequelize`          | ^6.37.5      | ORM for managing database operations.                |
| `joi`                | ^17.13.3     | Input validation for request data.                   |

---

# Scripts

- **Start the server**:
  ```bash
  npm start
  ```
 
# Scripts

- **Run in development mode**:
  ```bash
  npm run dev
  ```
- **Run tests**:
  ```bash
  npm test
  ```

# Future Enhancements

- Add pagination and filters for job listings.
- Integrate OAuth-based login.
- Implement notifications for job application updates.

