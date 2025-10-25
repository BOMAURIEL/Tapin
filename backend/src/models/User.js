const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  /**
   * Create a new user
   * @param {Object} userData - User registration data
   * @returns {Object} Created user (without password)
   */
  static async create({ email, password, userType, firstName, lastName, organizationName }) {
    try {
      // Hash password with bcrypt
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const query = `
        INSERT INTO users (email, password_hash, user_type, first_name, last_name, organization_name)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, email, user_type, first_name, last_name, organization_name, created_at
      `;

      const values = [
        email.toLowerCase().trim(),
        passwordHash,
        userType,
        firstName || null,
        lastName || null,
        organizationName || null
      ];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      // Handle unique constraint violation (duplicate email)
      if (error.code === '23505') {
        throw new Error('An account with this email already exists');
      }
      throw error;
    }
  }

  /**
   * Find user by email
   * @param {string} email
   * @returns {Object|null} User object or null
   */
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email.toLowerCase().trim()]);
    return result.rows[0] || null;
  }

  /**
   * Find user by ID
   * @param {number} id
   * @returns {Object|null} User object or null
   */
  static async findById(id) {
    const query = 'SELECT id, email, user_type, first_name, last_name, organization_name, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  /**
   * Verify password
   * @param {string} plainPassword
   * @param {string} hashedPassword
   * @returns {boolean}
   */
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * Update user password
   * @param {number} userId
   * @param {string} newPassword
   * @returns {boolean}
   */
  static async updatePassword(userId, newPassword) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);
    
    const query = 'UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2';
    const result = await pool.query(query, [passwordHash, userId]);
    return result.rowCount > 0;
  }
}

module.exports = User;
