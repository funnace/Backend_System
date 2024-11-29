const { registrationSchema } = require('../../Schema/validationSchema/registrationSchema');
const { db } = require('../../db_connection')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let result = await db.query('SELECT * FROM job_seekers WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    // Verify password
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

    // Send token and user info in the response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// User registration function
const userRegister = async (req, res) => {
  const { email, password, first_name, last_name, phone_number } = req.body;

  // Validate input using Joi schema
  const { error } = registrationSchema.validate({ email, password, first_name, last_name, phone_number });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Check if the user already exists
    let result = await db.query('SELECT * FROM job_seekers WHERE email = $1', [email]);

    if (result.rows.length > 0) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUserResult;
      newUserResult = await db.query(
        'INSERT INTO job_seekers (email, password, first_name, last_name, phone_number) VALUES ($1, $2, $3, $4, $5 ) RETURNING *',
        [email, hashedPassword, first_name, last_name, phone_number]
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
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const userLogout = async (req, res) => {
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

module.exports = { userLogin, userRegister, userLogout };
