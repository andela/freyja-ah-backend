import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * A class that handles authentication including generating and verifying user tokens.
 */
class Authenticate {
  /**
   * Generates user tokens
   * @param {int} id
   * @param {string} email
   * @returns {string} token
   */
  static generateToken(id, email) {
    const token = jwt.sign(
      {
        userId: id,
        email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '7d',
      },
    );
    return token;
  }

  /**
   * Generates user tokens
   * @param {string} token
   * @returns {object} decoded
   */
  static verifyToken(token) {
    let payload = '';
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      payload = decoded;
    });
    return payload;
  }
}

export default Authenticate;
