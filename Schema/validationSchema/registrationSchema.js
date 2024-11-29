const Joi = require('joi')

const registrationSchema = Joi.object({
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

module.exports = { registrationSchema }