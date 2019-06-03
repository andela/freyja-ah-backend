/* eslint-disable no-unused-vars */
const user = (sequelize, DataTypes) => {
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
  }, {});
  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};
export default user;
