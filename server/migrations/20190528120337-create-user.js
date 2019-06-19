/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    userName: {
      allowNull: true,
      type: Sequelize.STRING
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    gender: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      default: 'trainee',
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
