module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'Profile',
    {
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Phone number is required'
        },
        unique: {
          args: true,
          msg: 'A user exists with this phone number'
        }
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true
      },
      isEmployed: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      yrsOfExperience: {
        type: DataTypes.INTEGER,
        allowNull: true
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
        allowNull: true
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
        type: DataTypes.STRING
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
      },
      testPassed: {
        allowNull: true,
        type: DataTypes.INTEGER
      }
    },
    {}
  );
  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'User',
      onDelete: 'CASCADE'
    });
  };
  return Profile;
};
