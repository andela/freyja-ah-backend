/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Questions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    question: {
      type: Sequelize.STRING,
      allowNull: false
    },
    options: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: null,
      allowNull: false
    },
    answer: {
      type: Sequelize.STRING,
      allowNull: false
    },
    testId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        // QUestion belongs to one Test
        model: 'Tests',
        key: 'id'
      }
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Questions')
};
