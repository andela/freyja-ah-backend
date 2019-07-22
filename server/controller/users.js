/* eslint-disable no-unused-vars */
import sendGridMailer from '@sendgrid/mail';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../models';
import Authenticate from '../middleware/auth/Authenticate';

dotenv.config();
sendGridMailer.setApiKey(process.env.SENDGRID_API_KEY);

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
  static async registerUser(req, res, next) {
    const {
      firstName, lastName, email, userName, password,
    } = req.body;
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        firstName,
        lastName,
        email,
        userName,
        password
      }
    });
    if (!created) {
      return res.status(400).json({
        status: 400,
        error: 'This user already exists',
      });
    }
    await user.createProfile();

    const token = Authenticate.generateToken(user.id, user.email, user.userName);
    if (user.dataValues) {
      const msg = {
        to: user.email,
        from: 'CSLC@gmail.com',
        subject: 'Welcome',
        html: `<strong>Welcome to Customer Service Learning Community <h3> copy and paste this link below in your browser to verify your account<h3/></strong> ${
          process.env.HOST
        }/verify?token=${token}`,
      };
      await sendGridMailer.send(msg);
    }

    return res.status(201).json({
      status: res.statusCode,
      message: 'user registration was successful',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userName: user.userName,
      },
      token,
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
      id, firstName, lastName, userName, email
    } = user;
    return res.status(200).json({
      status: res.statusCode,
      message: 'user returned successfully',
      user: {
        id,
        firstName,
        lastName,
        userName,
        email,
      },
    });
  }

  /**
   * register a user
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   *
   */
  static async verifyUser(req, res) {
    const { token } = req.params;

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    try {
      const user = await User.findByPk(decodedToken.userId);
      if (!user) {
        return res.status(404).json({
          status: res.statusCode,
          message: 'user not registered',
        });
      }
      const updatedUser = await User.update(
        { isVerified: true },
        { where: { id: decodedToken.userId } },
      );

      if (updatedUser) {
        return res.status(200).json({
          status: 200,
          message: 'user has been verified',
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
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
    const user = await User.findOne({ where: { email } }).catch(next);
    if (!user) {
      return res.status(401).json({
        status: res.statusCode,
        error: 'Invalid email or password',
      });
    }

    if (user.comparePassword(password, user)) {
      const token = Authenticate.generateToken(user.id, user.email, user.userName);
      return res.status(200).json({
        status: res.statusCode,
        message: 'login was sucessful',
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email
        },
        token
      });
    }
    return res.status(401).send({
      status: res.statusCode,
      error: 'Invalid email or password'
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
    const userId = parseInt(req.user.userId, 10);
    const user = await User.findByPk(userId).catch(next);
    if (!user) {
      return res.status(404).json({
        status: res.statusCode,
        message: 'User does not exist'
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

  /**
   * reset user's password
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} response object
   *
   */
  static async resetPassword(req, res) {
    const { email } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'Email does not exist'
        });
      }
      const token = Authenticate.generateToken(user.id, user.email);
      const resetPasswordUrl = `${process.env.HOST}/change-password?token=${token}`;
      const message = {
        to: email,
        from: {
          name: 'Customer Service Learning Community',
          email: 'tundenasri@gmail.com'
        },
        subject: 'This is a test Email',
        html: `<h1> Hello there ${user.dataValues.firstName}</h1>
              <p> Please use this url to change your password ${resetPasswordUrl}</p>
              use the url to change your password by adding your new password to the body of the request
        `
      };
      sendGridMailer.send(message).then(sent => res.status(202).json({
        status: 'success',
        message:
            'Reset password email as been sent to you, Kindly check your email for next steps to be taken to reset your password'
      }));
    } catch (error) {
      return res.status(422).json({
        status: 'error',
        message: 'Unable to send reset password email, please try again'
      });
    }
  }

  /**
   * change user's password
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {function} next - next function
   * @returns {object} response object
   *
   */
  static async changePassword(req, res, next) {
    const { token } = req.query;
    const { newPassword } = req.body;
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message:
          'token not found in the request, kindly send another request to reset password',
      });
    }
    if (!newPassword) {
      return res.status(422).json({
        status: 'error',
        message: 'new password is not provided',
      });
    }
    const decoded = Authenticate.decodeToken(token);
    if (!decoded) {
      return res.status(401).json({
        status: 'error',
        message: 'token is invalid, please send reset password request again',
      });
    }
    const { email } = decoded;
    try {
      const foundUser = await User.findOne({ where: { email } });
      if (!foundUser) {
        return res.status(404).json({
          status: 'error',
          message: 'user not found',
        });
      }
      await foundUser.update({
        password: newPassword,
      });
      return res.status(202).json({
        status: 'success',
        message: 'password updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
