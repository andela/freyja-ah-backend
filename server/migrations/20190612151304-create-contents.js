module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Contents', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    link: {
      type: Sequelize.STRING
    },
    moduleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Modules',
        key: 'id'
      }
    }
  }),
  down: queryInterface => queryInterface.dropTable('Contents')
};
