const User = require('../models/User');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

/**
 * Generate JWT token
 * @param {Object} payload
 * @returns {string} JWT token
 */
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

/**
 * Register a new volunteer
 * POST /api/auth/register/volunteer
 */
exports.registerVolunteer = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists'
      });
    }

    // Create new volunteer
    const newUser = await User.create({
      email,
      password,
      userType: 'volunteer',
      firstName,
      lastName
    });

    // Generate JWT token
    const token = generateToken({
      userId: newUser.id,
      userType: newUser.user_type,
      email: newUser.email
    });

    res.status(201).json({
      success: true,
      message: 'Volunteer account created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        userType: newUser.user_type,
        firstName: newUser.first_name,
        lastName: newUser.last_name
      },
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.message === 'An account with this email already exists') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error during registration. Please try again later.'
    });
  }
};

/**
 * Register a new organization
 * POST /api/auth/register/organization
 */
exports.registerOrganization = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { email, password, organizationName } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists'
      });
    }

    // Create new organization
    const newUser = await User.create({
      email,
      password,
      userType: 'organization',
      organizationName
    });

    // Generate JWT token
    const token = generateToken({
      userId: newUser.id,
      userType: newUser.user_type,
      email: newUser.email
    });

    res.status(201).json({
      success: true,
      message: 'Organization account created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        userType: newUser.user_type,
        organizationName: newUser.organization_name
      },
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.message === 'An account with this email already exists') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error during registration. Please try again later.'
    });
  }
};

/**
 * Login user
 * POST /api/auth/login
 */
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isPasswordValid = await User.verifyPassword(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      userType: user.user_type,
      email: user.email
    });

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        userType: user.user_type,
        firstName: user.first_name,
        lastName: user.last_name,
        organizationName: user.organization_name
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login. Please try again later.'
    });
  }
};
