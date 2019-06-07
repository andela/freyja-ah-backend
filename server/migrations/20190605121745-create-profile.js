module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isEmployed: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      yrsOfExperience: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      industry: {
        allowNull: true,
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isEnrolled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      progress: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isCertified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      instagram: {
        type: Sequelize.STRING,
        allowNull: true
      },
      facebook: {
        type: Sequelize.STRING,
        allowNull: true
      },
      twitter: {
        type: Sequelize.STRING,
        allowNull: true
      },
      linkedIn: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Profiles');
  }
};
