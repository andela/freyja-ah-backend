/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt';

const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
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
          args: true,
          msg: 'Please enter your username',
        },
        unique: {
          args: true,
          msg: 'username already exists',
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'trainee',
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
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },

    {
      timestamps: false,
      scopes: {
        withoutPassword: {
          attributes: { exclude: ['password'] },
        }
      }
    }
  );
  /**
   * compares if the passed arguments are equal
   * @param {string} password
   * @param {object} user
   * @returns {boolean} true or false
   */
  User.prototype.comparePassword = (password, user) =>
    bcrypt.compareSync(password, user.password);

  /**
   * encrypt a user's password
   * @param {string} password
   * @returns {string} hashed password
   *
   */
  User.prototype.encryptPassword = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(6));

  User.beforeCreate((user) => {
    user.password = user.encryptPassword(user.password);
  });
  User.beforeUpdate((user) => {
    user.password = user.encryptPassword(user.password);
  });

  User.associate = (models) => {
    User.hasOne(models.Profile, {
      foreignKey: 'userId',
      as: 'profile',
      onDelete: 'CASCADE',
    });
    User.belongsToMany(models.Test, {
      through: 'UserTest',
      foreignKey: 'userId',
    });
    User.hasMany(models.CommunityMessage, {
      foreignKey: 'senderId',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Message, {
      foreignKey: 'senderId',
      as: 'sentMessages',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Reply, {
      foreignKey: 'ownerId',
      as: 'replies',
    });
  };
  return User;
};

export default userModel;
