module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Phone number is required'
      },
      unique: {
        args: true,
        msg: 'A user exists with this phone number'
      },
      validate: {
        len: {
          args: [11],
          msg: 'Phone number should be 11 digits'
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Age is required',
      },
      validate: {
        isNumeric: {
          args: true,
          msg: 'Please enter a valid age'
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Gender is required',
      }
    },
    isEmployed: {
      type: DataTypes.BOOLEAN,
      allowNull: {
        args: false,
        msg: 'Employment status is required'
      }
    },
    yrsOfExperience: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Years of experience is required'
      }
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isEnrolled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    progress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isCertified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    instagram: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    facebook: {
      allowNull: true,
      type: DataTypes.STRING
    },
    twitter: {
      allowNull: true,
      type: DataTypes.STRING
    },
    linkedIn: {
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {});
  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Profile;
};
