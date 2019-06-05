import models from '../models';
import Authenticate from '../middleware/auth/Authenticate';

const { User } = models;
/**
 * A class that handles user methods
* */
class UserController {
  /**
     * register a user
     * @param {object} req - request object
     * @param {object} res - response object
     * @param{function} next - next function
     * @returns {object} response object
     *
  */
  static async resgisterUser(req, res, next) {
    const {
      firstName, lastName, email, userName, password, industry, age, employed,
    } = req.body;
    const usersObj = await User.create({
      firstName,
      lastName,
      email,
      userName,
      password,
      age,
      industry,
      employed
    }).catch(next);

    const token = Authenticate.generateToken(usersObj.id, usersObj.email);
    return res.status(201).json({
      status: res.statusCode,
      message: 'user registration was successful',
      user: {
        id: usersObj.id,
        firstName: usersObj.firstName,
        lastName: usersObj.lastName,
        email: usersObj.email,
        userName: usersObj.userName,
      },
      token
    });
  }

  /**
     * get a registered user
     * @param {object} req - request object
     * @param {object} res - response object
     * @param{function} next - next function
     * @returns {object} response object
     *
  */
  static async getUser(req, res, next) {
    const user = await User.findByPk(parseInt(req.params.id, 10)).catch(next);
    if (!user) {
      return res.status(404).json({
        status: res.statusCode,
        message: 'user not registered',
      });
    }
    const {
      id, firstName, lastName, userName, email,
    } = user;
    return res.status(200).json({
      status: res.statusCode,
      message: 'user returned successfully',
      user: {
        id,
        firstName,
        lastName,
        userName,
        email
      },
    });
  }

  /**
     * login a registered user
     * @param {object} req - request object
     * @param {object} res - response object
     * @param{function} next - next function
     * @returns {object} response object
     *
  */
  static async login(req, res, next) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(422).json({
        status: res.statusCode,
        errors: { email: 'please provide your email' },
      });
    }

    if (!password) {
      return res.status(422).json({
        status: res.statusCode,
        errors: { password: 'please provide your password' },
      });
    }

    const user = await User.findOne(
      { where: { email } }
    ).catch(next);
    if (!user) {
      return res.status(401).json({
        status: res.statusCode,
        error: 'Invalid email or password',
      });
    }
    return res.status(200).json({
      status: res.statusCode,
      message: 'login was sucessful',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
      },
    });
  }

  /**
     * udate an existing  user
     * @param {object} req - request object
     * @param {object} res - response object
     * @param{function} next - next function
     * @returns {object} response object
     *
  */
  static async updateUser(req, res, next) {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId).catch(next);
    if (!user) {
      return res.status(404).json({
        status: res.statusCode,
        message: 'User does not exist',
      });
    }
    const updateValues = {
      firstName: req.body.firstName || user.firstName,
      lastName: req.body.lastName || user.lastName,
      userName: req.body.userName || user.userName,
      email: req.body.email || user.email,
      industry: req.body.email || user.industry,
      employed: req.body.employed || user.employed,
      age: req.body.age || user.age,
    };
    const updatedUser = await user.update(updateValues).catch(next);
    return res.status(200).json({
      status: res.statusCode,
      message: 'update was sucessful',
      user: {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        userName: updatedUser.userName,
        email: updatedUser.email,
        industry: updatedUser.industry,
        employed: updatedUser.employed,
        age: updatedUser.age,
      },
    });
  }
}

export default UserController;
