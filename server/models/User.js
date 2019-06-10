/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt';

const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your firstname',
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your lastname',
      },
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your username',
      },
      unique: {
        args: true,
        msg: 'username already exists',
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your password',
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your email address',
      },
      unique: {
        args: true,
        msg: 'Email already exists',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address',
        },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Please enter your username',
      },
    },
    employed: {
      default: true,
      type: DataTypes.BOOLEAN,
    },
    industry: {
      allowNull: true,
      type: DataTypes.STRING,
    }
  },

  {});
  /**
     * compares if the passed arguments are equal
     * @param {string} password
     * @param {object} user
     * @returns {boolean} true or false
    */
  User.prototype.comparePassword = (password, user) => bcrypt.compareSync(password, user.password);

  /**
     * encrypt a user's password
     * @param {string} password
     * @returns {string} hashed password
     *
  */
  User.prototype.encryptPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(6));

  User.beforeCreate((user) => {
    user.password = user.encryptPassword('password');
  });


  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};

export default userModel;
