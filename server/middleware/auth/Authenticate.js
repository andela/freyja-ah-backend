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
   * @param {string} userName
   * @returns {string} token
   */
  static generateToken(id, email, userName) {
    const token = jwt.sign(
      {
        userId: id, email, userName
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '7d'
      }
    );
    return token;
  }

  /**
   * Verifies user tokens
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {void}
   */
  static verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        status: 401,
        error: 'No Authentication Token Provided',
      });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: res.statusCode,
          error: 'token not verified',
        });
      }
      const { userId, email, userName } = decoded;
      req.user = { userId, email, userName };
      next();
    });
  }

  /**
   * decodes user tokens
   * @param {string} token
   * @returns {object} decoded
   */
  static decodeToken(token) {
    let payload = '';
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      payload = decoded;
    });
    return payload;
  }
}

export default Authenticate;
