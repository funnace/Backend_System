const Joi = require('joi')

const jobUpdateSchema = Joi.object({
    title: Joi.string().required().messages({
      'string.empty': 'Job title is required',
    }),
    description: Joi.string().required().messages({
      'string.empty': 'Job description is required',
    }),
    salary: Joi.number().optional().messages({
      'number.base': 'Salary must be a valid number',
    }),
    location: Joi.string().optional(),
    status: Joi.string().valid('open', 'closed').optional(),
    application_deadline: Joi.date().optional(),
  });

  const jobCreationSchema = Joi.object({
    title: Joi.string().required().messages({
      'string.empty': 'Job title is required',
    }),
    description: Joi.string().required().messages({
      'string.empty': 'Job description is required',
    }),
    salary: Joi.number().optional().messages({
      'number.base': 'Salary must be a valid number',
    }),
    location: Joi.string().optional(),
    job_type: Joi.string().valid('full-time', 'part-time', 'remote').optional(),
    application_deadline: Joi.date().optional(),
  });

  module.exports = { jobCreationSchema, jobUpdateSchema }