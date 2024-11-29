const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('../../db_connection');
const { registrationSchema } = require('../../Schema/validationSchema/registrationSchema');

// Admin Registration function
const adminRegister = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  // Validate input using Joi schema
  const { error } = registrationSchema.validate({ email, password, first_name, last_name });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Check if the admin already exists
    const result = await db.query('SELECT * FROM admins WHERE email = $1', [email]);

    if (result.rows.length > 0) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the admin to the database with fixed 'admin' role
    const newAdminResult = await db.query(
      'INSERT INTO admins (email, password, first_name, last_name, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [email, hashedPassword, first_name, last_name, 'admin'] // Role is fixed as 'admin'
    );

    const newAdmin = newAdminResult.rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { id: newAdmin.id, role: newAdmin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Step 6: Send the response with admin info and token
    res.status(201).json({
      message: 'Admin registered successfully',
      token,
      admin: {
        id: newAdmin.id,
        email: newAdmin.email,
        first_name: newAdmin.first_name,
        last_name: newAdmin.last_name,
        role: newAdmin.role
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Admin Login function
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin in the database
    const result = await db.query('SELECT * FROM admins WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const admin = result.rows[0];

    // Verify the password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    // Send token in response
    res.status(200).json({
      message: 'Login successful',
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        first_name: admin.first_name,
        last_name: admin.last_name,
        role: admin.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const adminLogout = async (req, res) => {
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
  adminRegister,
  adminLogin,
  adminLogout
};