module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ReportedModules', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    reason: {
      type: Sequelize.STRING,
      allowNull: false
    },
    comment: {
      type: Sequelize.STRING,
      allowNull: true
    },
    moduleId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    reporterId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('ReportedModules')
};
