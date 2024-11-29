const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('../../config/db_connection')
const { registrationSchema } = require('../../Schema/validationSchema/registrationSchema');

// Provider Login function
const providerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the provider in the database
    const result = await db.query('SELECT * FROM job_providers WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    const user = result.rows[0];

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send token in response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Provider Registration function
const providerRegister = async (req, res) => {
  const { email, password, first_name, last_name, role, company_name, website, industry, contact_number, address, company_description } = req.body;

  // Validate input using Joi schema
  const { error } = registrationSchema.validate({ email, password, first_name, last_name, role });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Check if the provider already exists
    const result = await db.query('SELECT * FROM job_providers WHERE email = $1', [email]);

    if (result.rows.length > 0) {
      return res.status(400).json({ message: 'Provider with this email already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the provider to the database
    const newUserResult = await db.query(
      'INSERT INTO job_providers (email, password, first_name, last_name, role, company_name, website, industry, contact_number, address, company_description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [email, hashedPassword, first_name, last_name, role, company_name, website, industry, contact_number, address, company_description]
    );

    const newUser = newUserResult.rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send the response with user info and token
    res.status(201).json({
      message: 'Provider registered successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        company_name: newUser.company_name,
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const providerLogout = async (req, res) => {
  try {
    // Since JWT is stateless, there's no need to do anything server-side.
    res.status(200).json({
      message: 'User logged out successfully. Please remove your token from storage.',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  providerLogin,
  providerRegister,
  providerLogout
};