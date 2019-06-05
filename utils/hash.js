import bcrypt from 'bcrypt';

/**
 * A class that handles password hashing and its related services
 */
class Hash {
  /**
     * login a registered user
     * @param {string} password - password to be hashed
     * @returns {string} hashed password
     *
  */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(6));
  }

  /**
     * compares if the passed arguments are equal
     * @param {string} plainTextPassword
     * @param {string} hashedPassword
     * @returns {boolean} true or false
    */
  static comparePassword(plainTextPassword, hashedPassword) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
  }
}
export default Hash;
